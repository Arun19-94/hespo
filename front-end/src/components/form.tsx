"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TSignUpSchema, signUpSchema } from "../interface/signUp";
import { useForm } from "react-hook-form";
import {signUp} from "../service/user";

function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema),
      });

      const onSubmit = async (data: any) => {
        await signUp(data)
      };
    return (
        <>  <div className="modal_container">
                <form className="modal" onSubmit={handleSubmit(onSubmit)}>
                    <span className="modal_heading">Registration</span>
                    <input
                        {...register("firstName")}
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        {...register("lastName")}
                        type="text"
                        placeholder="Last Name"
                    />
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="Confirm password"
                    />
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn_main bg-blue-500 disabled:bg-gray-500 py-2 rounded"
                        data-toggle="tooltip"
                        title="Create User"
                        >
                        Sign up
                    </button>
                </form>
            </div>
            {/* <div className="otherSignUp">
                <button type="button">Facebook</button>
                <button type="button">Google</button>
            </div> */}
            <a href="#">Have an account?</a>
           
        </>
    )

}
export default Form;