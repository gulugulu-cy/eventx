import dayjs from "dayjs"
import type { IAssetsData } from "@/interface"

import { TradingChart } from "./TradingChart"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

export function CurrencyCard({ data }: { data: IAssetsData }) {

    const onDateFormat = (date?: string) => {
        return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '_'
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <div className='border rounded-lg p-3 grid gap-1 cursor-pointer'>
                        <h3 className='font-bold text-2xl'>{data?.name || '_'}</h3>
                        <p className='text-[#ffa300] text-sm'>${data?.price_usd || '_'}</p>
                        <div className='text-xs'>
                            <div>volume:</div>
                            <div>{data?.volume_1hrs_usd || '_'}</div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px]">
                    <DialogHeader>
                        <DialogTitle >{data?.name || '_'}_Details</DialogTitle>
                        <DialogDescription />
                    </DialogHeader>
                    <div className="border rounded-lg p-3 grid gap-3  overflow-y-auto max-h-[70vh]">
                        <div className="flex items-center justify-between border rounded-lg py-2 gap-5 px-5">
                            <div className="min-w-fit">price($)</div>
                            <Separator orientation="vertical" />
                            <div className="text-sm">{`${data?.price_usd}` || '_'}</div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="border rounded-lg py-2 px-5">
                                <div className="min-w-fit">Quotation start time</div>
                                <div className="text-sm text-center mt-2 text-foreground/80">{onDateFormat(data?.data_quote_start)}</div>
                            </div>
                            <div className="border rounded-lg py-2 px-5">
                                <div className="min-w-fit">End time of quotation</div>
                                <div className="text-sm text-center mt-2 text-foreground/80">{onDateFormat(data?.data_quote_start)}</div>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="border rounded-lg py-2 px-5">
                                <div>Transaction start time</div>
                                <div className="text-sm text-center mt-2 text-foreground/80">{onDateFormat(data?.data_trade_start)}</div>
                            </div>
                            <div className="border rounded-lg py-2 px-5">
                                <div>End time of transaction</div>
                                <div className="text-sm text-center mt-2 text-foreground/80">{onDateFormat(data?.data_trade_end)}</div>
                            </div>
                        </div>
                        <TradingChart
                            volume_1day_usd={data?.volume_1day_usd || 0}
                            volume_1hrs_usd={data?.volume_1hrs_usd || 0}
                            volume_1mth_usd={data?.volume_1mth_usd || 0}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}



