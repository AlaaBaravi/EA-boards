import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useSWR from 'swr'
import { getBillboards } from '@/util/https'
import { ActivityIndicator } from 'react-native-paper'

export default function ExploreBillboards() {

    const params = useLocalSearchParams()

    console.log(params)
    const { data, error, isLoading } = useSWR('/get-billboards', () => getBillboards({
        filter: {
            company_id: params.company_id as string,
            region_id: params.region_id as string,
            billboard_type_id: params.type_id as string
        }
    }))

    if (isLoading) {
        return <ActivityIndicator />
    }

    console.log(data)

    return (
        <View>
            <Text>ExploreBillboards</Text>
        </View>
    )
}
