import React ,{useEffect, useState} from 'react'
//import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useUser } from '@clerk/clerk-react';
import CreationItem from '../components/Creationitem.jsx';
const Dashboard = () => {

const { user } = useUser

  const [creations, setCreations] = useState([])
  const [activePlan, setActivePlan] = useState('Free');
  //const getDaskboardData = async () =>{
    //setCreations(dummyCreationData)
  //}
  //useEffect(() => {
   // getDaskboardData()
  //},[])

  useEffect(() => {
  const getDashboardData = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ai/dashboard`, {
        headers: { 'Authorization': `Bearer ${user.id}` }
      });
      const data = await res.json();
      setCreations(data.creations);
      setActivePlan(data.plan);
    } catch (err) {
      console.error(err);
    }
  };
  getDashboardData();
}, [user]);





  return (
    <>
    <div className='h-full overflow-y-scroll p-6'>
  {/* Flex container holding both cards side-by-side */}
  <div className='flex justify-start gap-4 flex-wrap'>

    {/* Total Creation */}
    <div className='flex justify-between items-center w-72 p-4 px-6 white-rounded-xl border border-gray-200'>
      <div className='text-slate-600'>
        <p className='text-sm'>Total Creations</p>
        <h2 className='text-xl font-semibold'>{creations.length}</h2>
      </div> 
      <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
        <Sparkles className='w-5 text-white'/>
      </div> 
    </div>

    {/* Active Plan */}
    <div className='flex justify-between items-center w-72 p-4 px-6 white-rounded-xl border border-gray-200'>
      <div className='text-slate-600'>
        <p className='text-sm'>Active Plan</p>
        <h2 className='text-xl font-semibold'>
          <Protect plan='premium' fallback='Free'>Premium</Protect>
        </h2>
      </div> 
      <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
        <Gem className='w-5 text-white'/>
      </div> 
    </div>

  </div>

  <div className='space-y-3'>
    <p className='mt-6 mb-4'> Recent Creations</p>
    {creations.map((item) => (<CreationItem key={item.id} items={item}/>))}

  </div>
</div>

    
    </>
  )
}

export default Dashboard