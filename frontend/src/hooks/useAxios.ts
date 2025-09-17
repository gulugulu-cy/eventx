import { useState } from 'react';
import { AxiosError } from 'axios';
import type { AxiosRequestConfig } from 'axios';

import axiosInstance from '@/axios/axiosConfig';
import { toast } from 'sonner';

interface UseAxiosOptions<T> {
    onSuccess?: (data: T) => void;
    onFail?: (error?: string) => void;
}

export function useAxios<T>() {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);

    const fetchData = async (config: AxiosRequestConfig, options?: UseAxiosOptions<T>) => {
        const { onSuccess, onFail } = options || {};
        try {
            setLoading(true);
            const response = await axiosInstance({
                ...config,
            });
            setData(response.data?.data);
            onSuccess?.(response.data?.data);
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError<{ code: string, message: string }>;
            toast.error(axiosError.response?.data?.message || 'Service Error!')
            onFail?.(axiosError.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, fetchData };
}
