import { Outlet } from "react-router-dom"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
  

const MainLayout = () => {
    const isMobile = false
  return (
    <div className="h-screen bg-black text-white flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
            {/* Left Sidebar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
					Left Sidebar
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

				{/* Main content */}
				<ResizablePanel defaultSize={isMobile ? 80 : 60}>
					<Outlet />
				</ResizablePanel>

                {!isMobile && (
                    <>
                        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors">
                            {/* Right Sidebar */}
                            <ResizablePanel defaultSize={16} minSize={0} maxSize={24} collapsedSize={0}>
                                Friends Activity
                            </ResizablePanel>
                        </ResizableHandle>
                    </>
                )}
        </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout