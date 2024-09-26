export default function BlurredLine () {
    return (
        <div className='relative'>
            <hr className=' border-green-400 border-1 absolute w-full top-0 '/>
            <hr className=' border-green-400 border-1 blur-sm absolute w-full top-0 '/>
            <hr className=' border-green-400 border-2 blur-md absolute w-full top-0 '/>
            <hr className=' border-green-400 border-2 blur-sm absolute w-full top-0'/>
        </div>
    );
  };