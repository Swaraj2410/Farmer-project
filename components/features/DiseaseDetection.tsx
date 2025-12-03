"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload, Microscope, RotateCcw, Volume2, VolumeX, AlertTriangle, CheckCircle } from "lucide-react"
import { predictDisease, DiseaseApproach } from "@/lib/api"

interface DiseaseDetectionProps {
  t: any
  language: "en" | "hi" | "mr" | "kn"
}

export const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ t, language }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [diseaseResult, setDiseaseResult] = useState<any>(null)
  const [diseaseLoading, setDiseaseLoading] = useState(false)
  const [diseaseError, setDiseaseError] = useState<string | null>(null)
  const [selectedApproach, setSelectedApproach] = useState<DiseaseApproach>("torch")
  const [selectedCrop, setSelectedCrop] = useState<string>("")

  // Camera states
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Cleanup stream on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      window.speechSynthesis.cancel()
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setIsCameraOpen(true)
      setDiseaseError(null)
    } catch (err) {
      console.error("Error accessing camera:", err)
      setDiseaseError("Could not access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setIsCameraOpen(false)
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const context = canvas.getContext('2d')
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" })
            setSelectedFile(file)
            setImagePreview(canvas.toDataURL('image/jpeg'))
            stopCamera()
          }
        }, 'image/jpeg')
      }
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setDiseaseResult(null)
      setDiseaseError(null)
    }
  }

  const analyzeDiseaseImage = async () => {
    if (!selectedFile) {
      setDiseaseError('Please select an image file first')
      return
    }

    if (selectedApproach === 'keras' && !selectedCrop) {
      setDiseaseError('Please select a crop when using per-crop analysis')
      return
    }

    setDiseaseLoading(true)
    setDiseaseError(null)

    try {
      const result = await predictDisease(selectedFile, selectedApproach, selectedApproach === 'keras' ? selectedCrop : undefined)
      setDiseaseResult(result)

      // Auto-speak result
      speakResult(result)

    } catch (error) {
      console.error('Disease detection error:', error)
      setDiseaseError(error instanceof Error ? error.message : 'An error occurred during disease detection')
    } finally {
      setDiseaseLoading(false)
    }
  }

  const resetDiseaseDetection = () => {
    setSelectedFile(null)
    setImagePreview(null)
    setDiseaseResult(null)
    setDiseaseError(null)
    setSelectedCrop('')
    stopCamera()
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  const speakResult = (result: any) => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()

    const text = `Detected disease: ${result.disease_name}. Confidence: ${Math.round(result.confidence * 100)} percent. ${result.prevention_steps ? 'Suggested prevention: ' + result.prevention_steps : ''}`

    const utterance = new SpeechSynthesisUtterance(text)

    // Set language based on prop, fallback to English if voice not found
    // Note: Browser support for specific Indian languages varies
    if (language === 'hi') utterance.lang = 'hi-IN'
    else if (language === 'mr') utterance.lang = 'mr-IN'
    else if (language === 'kn') utterance.lang = 'kn-IN'
    else utterance.lang = 'en-US'

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const toggleSpeech = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else if (diseaseResult) {
      speakResult(diseaseResult)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-forest-green mb-4">{t.diseaseDetectionTitle}</h1>
          <p className="text-xl text-gray-600">{t.diseaseDetectionDescription}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-forest-green">{t.uploadForAnalysis}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  <TabsTrigger value="camera" onClick={startCamera}>Use Camera</TabsTrigger>
                </TabsList>

                <TabsContent value="upload">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-forest-green transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="disease-image-upload"
                    />
                    <Label htmlFor="disease-image-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-lg text-gray-600">{t.dropImagePrompt}</span>
                      <Button variant="outline" className="mt-4">
                        {t.uploadImage}
                      </Button>
                    </Label>
                  </div>
                </TabsContent>

                <TabsContent value="camera">
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    {!imagePreview && (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                    <canvas ref={canvasRef} className="hidden" />

                    {!imagePreview && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <Button onClick={captureImage} className="rounded-full h-12 w-12 p-0 bg-white hover:bg-gray-200">
                          <div className="h-10 w-10 rounded-full border-2 border-black" />
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {imagePreview && (
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={resetDiseaseDetection}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label>Analysis Approach</Label>
                  <Select value={selectedApproach} onValueChange={(v: DiseaseApproach) => setSelectedApproach(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="torch">General (39 Classes)</SelectItem>
                      {/* <SelectItem value="keras">Per-Crop Specific (Currently Unavailable)</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>

                {selectedApproach === 'keras' && (
                  <div>
                    <Label>Select Crop</Label>
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a crop..." />
                      </SelectTrigger>
                      <SelectContent>
                        {['apple', 'cherry', 'corn', 'grape', 'peach', 'pepper', 'potato', 'strawberry', 'tomato'].map(c => (
                          <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  className="w-full bg-forest-green hover:bg-forest-green/90 text-lg py-6"
                  onClick={analyzeDiseaseImage}
                  disabled={!selectedFile || diseaseLoading}
                >
                  {diseaseLoading ? (
                    <>
                      <Microscope className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Microscope className="h-5 w-5 mr-2" />
                      Analyze Disease
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-forest-green">Analysis Results</CardTitle>
              {diseaseResult && (
                <Button variant="ghost" size="icon" onClick={toggleSpeech}>
                  {isSpeaking ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {diseaseError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start text-red-700">
                  <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p>{diseaseError}</p>
                </div>
              )}

              {!diseaseResult && !diseaseError && (
                <div className="text-center py-12 text-gray-500">
                  <Microscope className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p>Upload an image or use camera to see analysis results</p>
                </div>
              )}

              {diseaseResult && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-semibold text-green-800">Detected Disease</h3>
                    </div>
                    <p className="text-xl font-bold text-green-900">{diseaseResult.disease_name}</p>
                    <p className="text-sm text-green-700 mt-1">
                      Confidence: {(diseaseResult.confidence * 100).toFixed(1)}%
                    </p>
                  </div>

                  {diseaseResult.description && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Description</h4>
                      <p className="text-gray-600 leading-relaxed">{diseaseResult.description}</p>
                    </div>
                  )}

                  {diseaseResult.prevention_steps && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Prevention & Treatment</h4>
                      <p className="text-gray-600 leading-relaxed">{diseaseResult.prevention_steps}</p>
                    </div>
                  )}

                  {diseaseResult.supplement && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-4">Recommended Supplement</h4>
                      <div className="flex items-start space-x-4">
                        <img
                          src={diseaseResult.supplement.image}
                          alt={diseaseResult.supplement.name}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <div>
                          <h5 className="font-medium text-gray-900">{diseaseResult.supplement.name}</h5>
                          <Button asChild className="mt-2" variant="outline" size="sm">
                            <a href={diseaseResult.supplement.buy_link} target="_blank" rel="noopener noreferrer">
                              Buy Now
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
