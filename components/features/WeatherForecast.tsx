"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CloudSun, Sun, Cloud, CloudRain, MapPin } from "lucide-react"

interface WeatherForecastProps {
    t: any
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ t }) => {
    const [location, setLocation] = useState<{ lat: number; long: number } | null>(null)
    const [locationName, setLocationName] = useState<string>("Detecting location...")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (navigator.geolocation) {
            setLoading(true)
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    })
                    // Mock reverse geocoding
                    setLocationName("Pune, Maharashtra")
                    setLoading(false)
                },
                (error) => {
                    console.error("Error getting location:", error)
                    setLocationName("Location unavailable")
                    setLoading(false)
                }
            )
        } else {
            setLocationName("Geolocation not supported")
        }
    }, [])

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.weatherForecastTitle}</h1>
                        <p className="text-xl text-gray-600">{t.weatherForecastDescription}</p>
                    </div>
                    <div className="flex items-center text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                        <MapPin className="h-4 w-4 mr-2 text-forest-green" />
                        {loading ? "Locating..." : locationName}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                    <Card className="lg:col-span-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white border-none">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">Today</h2>
                                    <p className="text-blue-100 text-lg">Nov 24, 2024</p>
                                    <div className="mt-8">
                                        <span className="text-7xl font-bold">28°</span>
                                        <span className="text-2xl text-blue-100 ml-2">Sunny</span>
                                    </div>
                                </div>
                                <Sun className="h-32 w-32 text-yellow-300 animate-pulse" />
                            </div>
                            <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/20">
                                <div>
                                    <p className="text-blue-100 mb-1">Humidity</p>
                                    <p className="text-2xl font-semibold">65%</p>
                                </div>
                                <div>
                                    <p className="text-blue-100 mb-1">Wind</p>
                                    <p className="text-2xl font-semibold">12 km/h</p>
                                </div>
                                <div>
                                    <p className="text-blue-100 mb-1">Rain Chance</p>
                                    <p className="text-2xl font-semibold">10%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t.sevenDayForecast}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { day: "Mon", temp: "27°", icon: CloudSun, status: "Partly Cloudy" },
                                    { day: "Tue", temp: "26°", icon: Cloud, status: "Cloudy" },
                                    { day: "Wed", temp: "24°", icon: CloudRain, status: "Light Rain" },
                                    { day: "Thu", temp: "25°", icon: CloudSun, status: "Partly Cloudy" },
                                    { day: "Fri", temp: "28°", icon: Sun, status: "Sunny" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <span className="font-medium w-12">{item.day}</span>
                                        <div className="flex items-center flex-1 px-4">
                                            <item.icon className={`h-5 w-5 mr-3 ${item.status === 'Sunny' ? 'text-yellow-500' :
                                                    item.status === 'Light Rain' ? 'text-blue-500' : 'text-gray-500'
                                                }`} />
                                            <span className="text-sm text-gray-500">{item.status}</span>
                                        </div>
                                        <span className="font-bold">{item.temp}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
