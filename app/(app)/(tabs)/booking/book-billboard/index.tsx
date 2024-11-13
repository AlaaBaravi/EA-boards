import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { z } from 'zod'
import CustomHeader from '@/components/home/CustomHeader'
import { mainstyles } from '@/constants/Styles'
import useZodForm from '@/hooks/useZodForm'
import { Picker } from "@react-native-picker/picker";
import CustomGenericPicker from '@/components/billboards/CustomGenericPicker'
import useSWR from 'swr'
import { getBillboardTypes, getCompanies, getRegions } from '@/util/https'
import { ActivityIndicator } from 'react-native-paper'
import CustomGenericInput from '@/components/billboards/CustomGenericInput'
import CustomButton from '@/components/ui/CustomButton'
import { ScrollView } from 'react-native'
import { BillboardType, Company, Region } from '@/constants/Types'
import { router } from 'expo-router'

const bookBillboardSchema = z.object({
    company: z.number(),
    type: z.number(),
    region: z.number(),
    kind: z.discriminatedUnion("kind", [
        z.object({
            kind: z.literal("paper"),
            start_time: z.string().min(3, {
                message: "Start time is required"
            }),
            end_time: z.string(),
        }),
        z.object({
            kind: z.literal("digital")
        })
    ])
})

const fetchFormValues = async () => {
    const companies = await getCompanies()
    const types = await getBillboardTypes()
    const regions = await getRegions()

    return {
        companies,
        types,
        regions
    }
}

export default function AddBillboardPage() {

    const form = useZodForm({
        schema: bookBillboardSchema,
        defaultValues: {
            kind: {
                kind: "digital"
            }
        },
        mode: "onSubmit"
    })

    const { data, error, isLoading } = useSWR<
        {
            companies: Company[],
            types: BillboardType[],
            regions: Region[]
        }
    >(`/info/get-book-billboard/form-info`, fetchFormValues);

    if (isLoading) {
        return (
            <ActivityIndicator />
        )
    }

    const selectedKind = form.watch("kind")

    function onSubmit(values: z.infer<typeof bookBillboardSchema>) {
        router.push({
            pathname: '/booking/explore-billboards',
            params: {
                company_id: values.company,
                type_id: values.type,
                region_id: values.region,
                kind: values.kind as any
            }
        })
    }

    if (data) {
        return (
            <>
                <CustomHeader>
                    <Text style={mainstyles.title1}>Billboards Filtering</Text>
                </CustomHeader>
                {
                    form.formState.isSubmitting && (
                        <ActivityIndicator />
                    )
                }
                {
                    !form.formState.isSubmitting && (
                        <ScrollView
                            style={{
                                flex: 1,
                            }}
                        >
                            <View style={mainstyles.container}>
                                <CustomGenericPicker<typeof bookBillboardSchema>
                                    control={form.control}
                                    label='Company'
                                    fieldName='company'
                                    errors={form.formState.errors}
                                >
                                    {
                                        data.companies?.map(company => (
                                            <Picker.Item
                                                key={company.id}
                                                value={company.id}
                                                label={company.name}
                                            />
                                        ))
                                    }
                                </CustomGenericPicker>
                                <CustomGenericPicker<typeof bookBillboardSchema>
                                    control={form.control}
                                    label='Type'
                                    fieldName='type'
                                    errors={form.formState.errors}
                                >
                                    {
                                        data.types?.map(type => (
                                            <Picker.Item
                                                key={type.id}
                                                value={type.id}
                                                label={type.text_en}
                                            />
                                        ))
                                    }
                                </CustomGenericPicker>
                                <CustomGenericPicker<typeof bookBillboardSchema>
                                    control={form.control}
                                    label='Region'
                                    fieldName='region'
                                    errors={form.formState.errors}
                                >
                                    {
                                        data.regions?.map(region => (
                                            <Picker.Item
                                                key={region.id}
                                                value={region.id}
                                                label={region.name_en}
                                            />
                                        ))
                                    }
                                </CustomGenericPicker>

                                <CustomGenericPicker<typeof bookBillboardSchema>
                                    control={form.control}
                                    label='Kind'
                                    fieldName='kind.kind'
                                    errors={form.formState.errors}
                                >
                                    <Picker.Item
                                        value={"paper"}
                                        label={"Paper"}
                                    />
                                    <Picker.Item
                                        value={"digital"}
                                        label={"Digital"}
                                    />
                                </CustomGenericPicker>
                                {
                                    selectedKind.kind === "paper" && (
                                        <>
                                            <CustomGenericInput<typeof bookBillboardSchema>
                                                fieldName='kind.start_time'
                                                errors={form.formState.errors}
                                                control={form.control}
                                                label='Start Time'
                                            />
                                            <CustomGenericInput<typeof bookBillboardSchema>
                                                fieldName='kind.end_time'
                                                errors={form.formState.errors}
                                                control={form.control}
                                                label='Start Time'
                                            />
                                        </>
                                    )
                                }
                                <CustomButton
                                    title='Next'
                                    onPress={form.handleSubmit(onSubmit)}
                                />
                            </View>
                        </ScrollView>
                    )
                }
            </>
        )
    }
}
