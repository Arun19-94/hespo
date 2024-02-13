"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TLoginSchema, loginSchema } from "../interface/login";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../service/user";

export default function FormWithReactHookFormAndZodAndServer({setLogins}:any) {
  const [user, setuser] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    let user = await login(data);
    setuser(user);
    setLogins()
  };
  return (
    <>
      <div className="modal_container">
        <form
          // onSubmit={e => {e.preventDefault(); handleSubmit(onSubmit)}}
          onSubmit={handleSubmit(onSubmit)}
          className="modal modal_login"
        >
          <span className="modal_heading">Login</span>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )}
          <br></br>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500">{`${errors.password.message}`}</p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            name="login"
            className="btn_main bg-blue-500 disabled:bg-gray-500 py-2 rounded"
            data-toggle="tooltip"
            title="Create User"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
