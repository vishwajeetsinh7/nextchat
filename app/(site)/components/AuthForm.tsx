"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import {BsGithub, BsGoogle} from 'react-icons/bs'
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession} from "next-auth/react";
import {useEffect} from 'react'
import {useRouter} from 'next/navigation'


type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {

  const session = useSession()
  const router = useRouter()
  console.log(session)

  useEffect(() => { 
    if(session?.status === 'authenticated') { 
      router.push('/users')
    }
  },[session?.status, router])

  const [variants, setVariants] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariants = useCallback(() => {
    if (variants === "LOGIN") {
      setVariants("REGISTER");
    } else {
      setVariants("LOGIN");
    }
  }, [variants]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variants === "REGISTER") {
      console.log(data, 'client getting data')
      axios.post('/api/register', data)
      .then(() =>     signIn('credentials', data))
      .catch(() => toast.error('something went wrong'))
      .finally(() => setIsLoading(false))
    }
    if (variants === "LOGIN") {
      signIn( 'credentials',  { 
        ...data, 
        redirect: false
      })
      .then((callback) => { 
        if(callback?.error) { 
          toast.error('Invalid Credentials')
        }
        if(callback?.ok && !callback?.error ) { 
          toast.success('Logged In!')
        }
      })
      .finally(() => setIsLoading(false))
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {  redirect: false})
    .then((callback) => { 
      
      if(callback?.error) { 
        toast.error('Invalid Credentials')
      }

      if(callback?.ok && !callback?.error) { 
        toast.success('Logged in!')
      }
    })
    .finally(() => setIsLoading(false))

  };

  return (
    <div
      className="
         mt-8
         sm:mx-auto
         sm:w-full
         sm:max-w-md

        "
    >
      <div
        className="
             bg-white
             px-4
             py-8
             shadow
             sm:rounded-lg
             sm:px-10
            "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variants === "REGISTER" && (
            <Input
              id="name"
              errors={errors}
              required
              type="text"
              label="Name:"
              register={register}
              disabled={isLoading}
            />
          )}
          <Input
            type="email"
            id="email"
            errors={errors}
            required
            label="Email:"
            register={register}
            disabled={isLoading}

          />
          <Input
            type="password"
            id="password"
            errors={errors}
            required
            label="Password:"
            register={register}
            disabled={isLoading}

          />

          <div>
            <Button
            disabled={isLoading}
            fullWidth
            type="submit"
            >
                {variants === 'LOGIN' ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6"> 
            <div className="relative">
                <div
                className="
                absolute
                inset-0
                flex
                items-center
                "
                > 
                <div className="w-full border-t border-x-gray-300">

                <div className="
                relative
                flex
                justify-center
                text-sm
                "> 
                <span className="bg-white px-2 text-gray-500">Or Continue With
                </span>
                </div>
                </div>

                </div>
            </div>
                <div className="mt-6 flex gap-2 py-5">
                    <AuthSocialButton
                    onClick={() => socialAction('github')}
                    icon={BsGithub}
                    />
                    <AuthSocialButton
                    onClick={() => socialAction('google')}
                    icon={BsGoogle}
                    />
                </div>

                <div
                className="
                flex
                gap-2
                justify-center
                text-sm
                mt-6
                px-2
                text-gray-500
                "
                > 
                    <div> 
                        {variants === 'LOGIN' ? 'NEW TO ECLINICS?' : 'ALREADY AN HAVE ACCOUNT'}
                    </div>
                    <div
                    onClick={toggleVariants}
                    className="underline cursor-pointer"
                    > 
                        {variants === 'LOGIN' ? 'Create an Account': 'Login'}
                    </div>
                </div>
        </div>

      </div>
    </div>
  );
};
export default AuthForm;
