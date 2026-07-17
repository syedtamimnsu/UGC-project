import { useAuth, useUser } from "@clerk/clerk-react"
import { Loader2Icon, RectangleHorizontalIcon, RectangleVerticalIcon, Wand2Icon } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { PrimaryButton } from "../components/Buttons"
import Title from "../components/Title"
import UploadZone from "../components/UploadZone"
import api from "../configs/axios"

function Generator() {


    const {user} = useUser()
    const {getToken} = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')
    const [aspectRatio, setAspectratio] = useState('9:16')
    const [productImage, setProductImage] = useState<File | null>(null)
    const [modelImage, setModelImage] = useState<File | null>(null)
    const [userPrompt, setUserPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'model') => {
        if(e.target.files && e.target.files[0]){
            if(type === 'product'){
                setProductImage(e.target.files[0])
            } else{
                setModelImage(e.target.files[0])
            }
        }

    }


    const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!user) return toast("Please login to generate")

        if(!productImage || !modelImage || !name || !aspectRatio || !productName){
            return toast("Please fill all the required fields")
        }

        try {

            setIsGenerating(true)
            const formData = new FormData()

            formData.append("name", name)
            formData.append("productName", productName)
            formData.append("productDescription", productDescription)
            formData.append("images", productImage)
            formData.append("images", modelImage)
            formData.append("userPrompt", userPrompt)
            formData.append("aspectRatio", aspectRatio)

            const token = await getToken()

            console.log("token:", token)
            console.log("making api call now")

            const { data } = await api.post('/api/project/create', formData, {
                headers: { Authorization: `Bearer ${token}`}
            })
            console.log("api response:", data)

            toast.success(data.message)
            navigate('/result/' + data.projectId)

        } catch (error: any){
            setIsGenerating(false);
            toast.error(error?.response?.data?.message || error.message)

        }

    }
    







    return (
        <div className='min-h-screen text-white p-6 md:p-12 mt-28'>

            <form onSubmit={handleGenerate} className="max-w-4xl mx-auto mb-40">
                <Title heading="Create In-Context Image" description="Upload your model and product images to generate stunning UGC, short-form videos and social media posts" />

                <div className="flex gap-20 max-sm:flex-col items-start justify-between">
                    {/* left column */}
                    <div className="flex flex-col w-full max-w-[480px] gap-8 mb-12 ">
                        
                        <UploadZone label="Product Image" file={productImage} onClear={()=>setProductImage(null)} onChange={(e) => handleFileChange(e, 'product')} />
                        <UploadZone label="Model Image" file={modelImage} onClear={()=>setModelImage(null)} onChange={(e) => handleFileChange(e, 'model')} />    
                    </div>

                    {/* right column */}
                    <div className="w-full">
                        <div className="mb-4 text-gray-300">
                            <label htmlFor="name" className="block text-sm mb-4">Project Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name your project" required className="w-full bg-white/3 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all" />
                        </div>

                        <div className="mb-4 text-gray-300">
                            <label htmlFor="productName" className="block text-sm mb-4">Product Name</label>
                            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Enter product name" required className="w-full bg-white/3 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all" />
                        </div>

                        <div className="mb-4 text-gray-300">
                            <label htmlFor="productDescription" className="block text-sm mb-4">Product  <span className="text-xs text-violet-400">(optional)</span></label>
                            <textarea id="productDescription" rows={4} value={productDescription} onChange={(e) => setProductDescription(e.target.value)} placeholder="Enter the description of the product" className="w-full bg-white/3 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all" />
                        </div>

                        <div className="mb-4 text-gray-300">
                            <label htmlFor="userPrompt" className="block text-sm mb-4">User Prompt <span className="text-xs text-violet-400">(optional)</span></label>
                            <textarea id="userPrompt" rows={4} value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="Enter your prompt for the AI generator" className="w-full bg-white/3 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all" />
                        </div>

                        <div className="mb-4 text-gray-300">
                            <label className="block text-sm mb-4">Aspect Ratio</label>
                            <div className="flex gap-3">
                                <RectangleVerticalIcon onClick={()=>setAspectratio('9:16')} className={`p-2.5 size-13 bg-white/6 rounded transition-all ring-2 ring-transparent cursor-pointer ${aspectRatio === '9:16' ? 'ring-violet-500/50 bg-white/10' : ''}`} />
                                <RectangleHorizontalIcon onClick={()=>setAspectratio('16:9')} className={`p-2.5 size-13 bg-white/6 rounded transition-all ring-2 ring-transparent cursor-pointer ${aspectRatio === '16:9' ? 'ring-violet-500/50 bg-white/10' : ''}`} />

                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-10">
                    <PrimaryButton type="submit" disabled={isGenerating} className="px-10 py-3 rounded-md disabled:opacity-70 disabled:cursor-not-allowed">
                        {isGenerating ? (
                            <>
                            <Loader2Icon className="size-5 animate-spin" /> Generating...
                            </>
                        ) : (
                            <>
                            <Wand2Icon className="size-5" /> Generated Image</>
                        )}
                    </PrimaryButton>
                </div>
            </form>


            
        </div>
    )
}

export default Generator
