import { ScrollView, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getBillboards } from '@/util/https'
import BillboardCard from '@/components/billboards/BillboardCard'
import { useQuery } from '@tanstack/react-query'
import { Billboard } from '@/constants/Types'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

export default function ExploreBillboards() {
    const params = useLocalSearchParams<{
        company_id?: string,
        region_id?: string,
        type_id?: string
    }>()

    const {
        data: billboards,
        isLoading,
        isError,
        error,
    } = useQuery<Billboard[], Error>(["billboards"], () => getBillboards(
        {
            filter: {
                company_id: params.company_id as string,
                region_id: params.region_id as string,
                billboard_type_id: params.type_id as string
            }
        }
    ), {
        refetchOnMount: true,
    });

    if (isLoading || billboards === null) {
        return <Loading />;
    }

    if (isError) {
        return <Error errorMessage={error.message} />;
    }

    return (
        <ScrollView
            style={{ flex: 1 }}
        >
            {
                billboards?.map(
                    billboard => <BillboardCard
                        key={billboard.id}
                        billboard={billboard}
                        isBooking={true}
                    />
                )
            }
        </ScrollView>
    )
}
