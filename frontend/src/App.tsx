import { LuLoader } from "react-icons/lu"
import { useEffect, useMemo } from "react"

import empty from '/images/empty.png'

import { api } from "./axios/api"
import { useAxios } from "./hooks/useAxios"

import { Separator } from "./components/ui/separator"
import { CurrencyCard } from "./components/CurrencyCard"

import type { IAssetsData } from "./interface"

function App() {
  const { getListAllAssets } = api.assets;
  const { data, loading, fetchData } = useAxios<IAssetsData[]>();

  useEffect(() => {
    fetchData(getListAllAssets())
  }, [])

  const renderData = useMemo(() => {
    return data?.map(item => (
      <CurrencyCard key={item.asset_id} data={item} />
    ))
  }, [data])

  return (
    <div className='mx-auto lg:max-w-[1024px] w-full h-screen p-5 flex items-center justify-center'>
      <div className="border rounded-lg w-full overflow-hidden pb-2">
        <h3 className="text-xl font-bold p-5">Cryptocurrency Realtime Price</h3>
        <Separator />
        {
          data?.length &&
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 max-h-[calc(100vh-130px)] overflow-y-auto p-3">
            {renderData}
          </div>
        }
        {
          (!data?.length && !loading) && <div className="flex flex-col items-center gap-3 justify-center w-full py-10">
            <img src={empty} className="w-[300px]" />
          </div>
        }
        {
          loading &&
          <div className="flex flex-col items-center gap-3 justify-center w-full py-10">
            <LuLoader className="animate-spin text-6xl" />
            <p>数据加载中...</p>
          </div>
        }
      </div>
    </div>
  )
}

export default App
