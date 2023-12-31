'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import {
    type DehydratedState,
    HydrationBoundary,
    QueryClient,
    QueryClientProvider,
    dehydrate,
} from '@tanstack/react-query'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import { AppProps } from 'next/app'

interface ProviderOptions {
    key: string
}

interface ProviderProps {
    children: React.ReactNode
    options: ProviderOptions
    dehydratedState: DehydratedState
}

export function Providers({
    children,
    options,
    dehydratedState,
}: ProviderProps) {
    const [queryClient] = useState(
        new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
    )
    const [{ cache, flush }] = useState(() => {
        const cache = createCache(options)
        cache.compat = true
        const prevInsert = cache.insert
        let inserted: any = []
        cache.insert = (...args) => {
            const serialized = args[1]
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name)
            }
            return prevInsert(...args)
        }
        const flush = () => {
            const prevInserted = inserted
            inserted = []
            return prevInserted
        }
        return { cache, flush }
    })
    useServerInsertedHTML(() => {
        const names = flush()
        if (names.length === 0) {
            return null
        }
        let styles = ''
        for (const name of names) {
            styles += cache.inserted[name]
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        )
    })

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                <CacheProvider value={cache}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {children}
                    </ThemeProvider>
                </CacheProvider>
            </HydrationBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
