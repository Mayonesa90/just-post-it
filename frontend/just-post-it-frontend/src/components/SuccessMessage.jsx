export default function SuccessMessage ({message}) {

    return (
      <div className=' font-IBMPlexMono bg-green-500 w-fit p-2 absolute top-24 place-self-center '>
        <p className=" text-xs">
          {message}
        </p>
      </div>
    )
  }