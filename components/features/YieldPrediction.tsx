import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3 } from "lucide-react"
import { getYieldAndFertilizer, getFertilizerOptions } from "@/lib/api"

interface YieldPredictionProps {
    t: any
}

export function YieldPrediction({ t }: YieldPredictionProps) {
    const [showYieldForm, setShowYieldForm] = useState(false)
    const [yieldResult, setYieldResult] = useState<any>(null)
    const [yieldLoading, setYieldLoading] = useState<boolean>(false)
    const [yieldError, setYieldError] = useState<string | null>(null)

    const [soilTypes, setSoilTypes] = useState<string[]>(['Black', 'Clayey', 'Loamy', 'Red', 'Sandy'])
    const [cropTypes, setCropTypes] = useState<string[]>(['Barley', 'Cotton', 'Ground Nuts', 'Maize', 'Millets', 'Oil seeds', 'Paddy', 'Pulses', 'Sugarcane', 'Tobacco', 'Wheat'])

    const [yieldFormData, setYieldFormData] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("farmtech-yieldFormData");
            return saved ? JSON.parse(saved) : {
                N: '',
                P: '',
                K: '',
                temperature: '',
                humidity: '',
                ph: '',
                rainfall: '',
                fert_temperature: '',
                fert_humidity: '',
                moisture: '',
                soil_type: '',
                crop_type: '',
                nitrogen: '',
                potassium: '',
                phosphorous: ''
            };
        }
        return {
            N: '',
            P: '',
            K: '',
            temperature: '',
            humidity: '',
            ph: '',
            rainfall: '',
            fert_temperature: '',
            fert_humidity: '',
            moisture: '',
            soil_type: '',
            crop_type: '',
            nitrogen: '',
            potassium: '',
            phosphorous: ''
        }
    })

    useEffect(() => {
        getFertilizerOptions()
            .then((meta) => {
                if (Array.isArray(meta.soil_types) && meta.soil_types.length) setSoilTypes(meta.soil_types)
                if (Array.isArray(meta.crop_types) && meta.crop_types.length) setCropTypes(meta.crop_types)
            })
            .catch(() => { })
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("farmtech-yieldFormData", JSON.stringify(yieldFormData));
        }
    }, [yieldFormData]);

    const handleYieldFormChange = (field: string, value: string) => {
        setYieldFormData((prev: any) => ({ ...prev, [field]: value }))
    }

    const validateYieldForm = (): string | null => {
        const requiredFields = [
            'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall',
            'fert_temperature', 'fert_humidity', 'moisture', 'soil_type', 'crop_type',
            'nitrogen', 'potassium', 'phosphorous'
        ]

        for (const field of requiredFields) {
            if (!yieldFormData[field as keyof typeof yieldFormData]) {
                return `Please fill in all required fields. Missing: ${field.replace('_', ' ')}`
            }
        }

        // Validate numeric fields
        const numericFields = [
            'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall',
            'fert_temperature', 'fert_humidity', 'moisture', 'nitrogen', 'potassium', 'phosphorous'
        ]

        for (const field of numericFields) {
            const value = parseFloat(yieldFormData[field as keyof typeof yieldFormData])
            if (isNaN(value)) {
                return `${field.replace('_', ' ')} must be a valid number`
            }
        }

        return null
    }

    const predictYieldAndFertilizer = async () => {
        const validationError = validateYieldForm()
        if (validationError) {
            setYieldError(validationError)
            return
        }

        setYieldLoading(true)
        setYieldError(null)

        try {
            const payload = {
                N: parseFloat(yieldFormData.N),
                P: parseFloat(yieldFormData.P),
                K: parseFloat(yieldFormData.K),
                temperature: parseFloat(yieldFormData.temperature),
                humidity: parseFloat(yieldFormData.humidity),
                ph: parseFloat(yieldFormData.ph),
                rainfall: parseFloat(yieldFormData.rainfall),
                fert_temperature: parseFloat(yieldFormData.fert_temperature),
                fert_humidity: parseFloat(yieldFormData.fert_humidity),
                moisture: parseFloat(yieldFormData.moisture),
                soil_type: yieldFormData.soil_type,
                crop_type: yieldFormData.crop_type,
                nitrogen: parseFloat(yieldFormData.nitrogen),
                potassium: parseFloat(yieldFormData.potassium),
                phosphorous: parseFloat(yieldFormData.phosphorous)
            }

            const result = await getYieldAndFertilizer(payload)
            setYieldResult(result)
            setShowYieldForm(false)
        } catch (error) {
            console.error('Yield prediction error:', error)
            setYieldError(error instanceof Error ? error.message : 'An error occurred during yield prediction')
        } finally {
            setYieldLoading(false)
        }
    }

    const resetYieldPrediction = () => {
        setYieldResult(null)
        setYieldError(null)
        setShowYieldForm(false)
        setYieldFormData({
            N: '',
            P: '',
            K: '',
            temperature: '',
            humidity: '',
            ph: '',
            rainfall: '',
            fert_temperature: '',
            fert_humidity: '',
            moisture: '',
            soil_type: '',
            crop_type: '',
            nitrogen: '',
            potassium: '',
            phosphorous: ''
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.yieldPredictionTitle}</h1>
                    <p className="text-xl text-gray-600">{t.yieldPredictionDescription}</p>
                </div>

                {!showYieldForm && !yieldResult && (
                    <div className="text-center mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-forest-green">Get AI-Powered Recommendations</CardTitle>
                                <CardDescription>
                                    Enter your soil and environmental conditions to get crop and fertilizer recommendations
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => setShowYieldForm(true)}
                                    className="bg-forest-green hover:bg-forest-green/90"
                                    size="lg"
                                >
                                    <BarChart3 className="h-5 w-5 mr-2" />
                                    Start Analysis
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {showYieldForm && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-forest-green">Soil & Environmental Data</CardTitle>
                            <CardDescription>
                                Please provide accurate measurements for best results
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {yieldError && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-700">{yieldError}</p>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="N">Nitrogen (N) Content</Label>
                                    <Input
                                        id="N"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 90"
                                        value={yieldFormData.N}
                                        onChange={(e) => handleYieldFormChange('N', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="P">Phosphorus (P) Content</Label>
                                    <Input
                                        id="P"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 42"
                                        value={yieldFormData.P}
                                        onChange={(e) => handleYieldFormChange('P', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="K">Potassium (K) Content</Label>
                                    <Input
                                        id="K"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 43"
                                        value={yieldFormData.K}
                                        onChange={(e) => handleYieldFormChange('K', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="temperature">Temperature (°C)</Label>
                                    <Input
                                        id="temperature"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 20.8"
                                        value={yieldFormData.temperature}
                                        onChange={(e) => handleYieldFormChange('temperature', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="humidity">Humidity (%)</Label>
                                    <Input
                                        id="humidity"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 82"
                                        value={yieldFormData.humidity}
                                        onChange={(e) => handleYieldFormChange('humidity', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="ph">Soil pH</Label>
                                    <Input
                                        id="ph"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 6.5"
                                        value={yieldFormData.ph}
                                        onChange={(e) => handleYieldFormChange('ph', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="rainfall">Rainfall (mm)</Label>
                                    <Input
                                        id="rainfall"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 202"
                                        value={yieldFormData.rainfall}
                                        onChange={(e) => handleYieldFormChange('rainfall', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="fert_temperature">Field Temperature (°C)</Label>
                                    <Input
                                        id="fert_temperature"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 26"
                                        value={yieldFormData.fert_temperature}
                                        onChange={(e) => handleYieldFormChange('fert_temperature', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="fert_humidity">Field Humidity (%)</Label>
                                    <Input
                                        id="fert_humidity"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 52"
                                        value={yieldFormData.fert_humidity}
                                        onChange={(e) => handleYieldFormChange('fert_humidity', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="moisture">Soil Moisture (%)</Label>
                                    <Input
                                        id="moisture"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 38"
                                        value={yieldFormData.moisture}
                                        onChange={(e) => handleYieldFormChange('moisture', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="nitrogen">Nitrogen Value</Label>
                                    <Input
                                        id="nitrogen"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 37"
                                        value={yieldFormData.nitrogen}
                                        onChange={(e) => handleYieldFormChange('nitrogen', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="potassium">Potassium Value</Label>
                                    <Input
                                        id="potassium"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 0"
                                        value={yieldFormData.potassium}
                                        onChange={(e) => handleYieldFormChange('potassium', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phosphorous">Phosphorus Value</Label>
                                    <Input
                                        id="phosphorous"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g., 0"
                                        value={yieldFormData.phosphorous}
                                        onChange={(e) => handleYieldFormChange('phosphorous', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="soil_type">Soil Type</Label>
                                    <Select value={yieldFormData.soil_type} onValueChange={(value) => handleYieldFormChange('soil_type', value)}>
                                        <SelectTrigger id="soil_type">
                                            <SelectValue placeholder="Select soil type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {soilTypes.map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="crop_type">Crop Type</Label>
                                    <Select value={yieldFormData.crop_type} onValueChange={(value) => handleYieldFormChange('crop_type', value)}>
                                        <SelectTrigger id="crop_type">
                                            <SelectValue placeholder="Select crop type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cropTypes.map(type => (
                                                <SelectItem key={type} value={type}>{type}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <Button
                                    onClick={predictYieldAndFertilizer}
                                    disabled={yieldLoading}
                                    className="bg-forest-green hover:bg-forest-green/90"
                                >
                                    {yieldLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <BarChart3 className="h-4 w-4 mr-2" />
                                            Get Recommendations
                                        </>
                                    )}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowYieldForm(false)}
                                    disabled={yieldLoading}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {yieldResult && (
                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-forest-green">Recommended Crop</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-green-600 mb-2">
                                        {yieldResult.recommended_crop}
                                    </div>
                                    <p className="text-gray-600">Best crop for your conditions</p>
                                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                                        <p className="text-green-700 text-sm">
                                            This crop is recommended based on your soil's NPK levels, environmental conditions, and climate data.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-forest-green">Recommended Fertilizer</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">
                                        {yieldResult.fertilizer}
                                    </div>
                                    <p className="text-gray-600">Optimal fertilizer for your soil</p>
                                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                        <p className="text-blue-700 text-sm">
                                            This fertilizer composition will provide the best nutrients for your selected crop type and soil conditions.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {yieldResult && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-forest-green">{t.benefits}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-50 p-4 rounded">
                                    <h4 className="font-semibold text-green-800">{t.betterPlanning}</h4>
                                    <p className="text-sm text-green-700">{t.betterPlanningDesc}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded">
                                    <h4 className="font-semibold text-green-800">{t.maximizeRevenue}</h4>
                                    <p className="text-sm text-green-700">{t.maximizeRevenueDesc}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {yieldResult && (
                    <div className="text-center">
                        <Button
                            onClick={resetYieldPrediction}
                            variant="outline"
                            className="mr-4"
                        >
                            Start New Analysis
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
