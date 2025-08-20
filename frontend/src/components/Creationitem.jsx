{/*import React from 'react'
import Markdown from 'react-markdown'

const Creationitem = ({items}) => {

    const [expanded, setExpanded] = React.useState(false);

  return (
    <div onClick = {()=> setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{items.prompt}</h2>
                <p className='text-gray-500'>{items.type} - {new Date(items.created_at) .toLocaleDateString()}</p>
            </div>
            <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full '>
                {items.type}
            </button>
        </div>
    {
        expanded && (
            <div>
                {items.type=== 'image' ? (
                    <div>
                        <img src={items.content} alt="image" className='mt-3 w-full max-w-md' />
                    </div>
                ):(
                    <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-700'>
                        <div className='reset-tw'>
                            <Markdown>
                                {items.content}
                            </Markdown>
                            
                        </div>
                        </div>
                
                )}
            </div>
        )
    }
    </div>
  )
}

export default Creationitem*/}
import React from 'react';
//import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { AiToolsData } from "../tools/AiToolsData";

const AiTools = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleToolClick = async (tool) => {
        if (!user) return alert("Please sign in to use this tool.");

        try {
            // Log tool usage in backend (optional)
            await fetch(`${import.meta.env.VITE_API_URL}/ai/log-tool`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.id}`, // use Clerk JWT if available
                },
                body: JSON.stringify({ tool: tool.title }),
            });

            navigate(tool.path);
        } catch (err) {
            console.error("Error logging tool:", err);
        }
    };

    return (
        <div className='px-4 sm:px-20 xl:px-32 my-24 mt-0'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI</h2>
                <p className="text-gray-500 max-w-lg mx-auto">
                    Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
                </p>
            </div>

            <div className="flex flex-wrap mt-10 justify-center">
                {AiToolsData.map((tool, index) => (
                    <div
                        key={index}
                        className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer'
                        onClick={() => handleToolClick(tool)}
                    >
                        <tool.icon
                            className='w-12 h-12 text-white rounded-xl mb-4'
                            style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
                        />
                        <h3 className='mt-6 mb-3 text-lg font-semibold'>{tool.title}</h3>
                        <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AiTools;
