export default function ErrorMessage ({errorMsg}) {
        
    return (
      <div className=' font-IBMPlexMono bg-red-700 w-fit p-2 absolute top-24 place-self-center'>
        <p className=" text-xs text-slate-50 tracking-wide">
          {errorMsg}
        </p>
      </div>
    )
  }