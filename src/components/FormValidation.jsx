import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const FormValidation = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      social: {
        facebook: "",
        twitter: "",
      },
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("form submitted", data);
  };

  return (
    <div className='p-8 bg-purple-400 w-4/5 rounded-xl'>
      <h1 className='text-xl underline text-center mb-8'>Form Validation</h1>
      <form
        action=''
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col justify-center items-center '
        noValidate
      >
        {/* username */}

        <label htmlFor='username'>Username:</label>
        <input
          id='username'
          {...register("username", { required: "username is required" })}
          type='text'
          className='w-full p-1 rounded-xl my-4 border-0 outline-none'
        />
        <p className='mb-4 text-red-700 text-xs'>{errors.username?.message}</p>

        {/* email */}

        <label htmlFor='email'>Email:</label>
        <input
          {...register("email", {
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "invalid email format",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" || "Cannot Authorize."
                );
              },
              blackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "email not supported."
                );
              },
            },
          })}
          id='email'
          type='text'
          className='w-full p-1 rounded-xl my-4 border-0 outline-none'
        />
        <p className='mb-4 text-red-700 text-xs'>{errors.email?.message}</p>

        {/* phone */}

        <label htmlFor='phone'>Phone Number:</label>
        <input
          id='phone'
          {...register("phone", {
            required: "Field cannot be empty.",
          })}
          name='phone'
          type='text'
          className='w-full p-1 rounded-xl my-4 border-0 outline-none'
        />
        <p className='mb-4 text-red-700 text-xs'>{errors.phone?.message}</p>

        {/* Facebook */}

        <label htmlFor='facebook'>Facebook:</label>
        <input
          id='facebook'
          {...register("social.facebook")}
          type='text'
          className='w-full p-1 rounded-xl my-4 border-0 outline-none'
        />

        {/* twitter */}

        <label htmlFor='twitter'>Twitter:</label>
        <input
          id='twitter'
          {...register("social.twitter")}
          type='text'
          className='w-full p-1 rounded-xl my-4 border-0 outline-none'
        />

        {/* submit */}

        <button
          type='submit'
          className='p-2 w-full rounded-full bg-green-200 hover:bg-green-100 my-4'
        >
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
export default FormValidation;
