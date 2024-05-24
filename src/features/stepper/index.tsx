import React from 'react'

interface StepperType {
    currentStep: number,
    numberOfSteps: number
}

const Stepper = ({ currentStep, numberOfSteps }: StepperType) => {
    const activeColor = (index: number) => currentStep >= index ? 'bg-blue-500' : 'bg-gray-300'
    const isFinalStep = (index: number) => index === numberOfSteps - 1
    return (
        <div className="flex items-center mt-10">
            {Array.from({ length: numberOfSteps }).map((_, index) => (
                <React.Fragment key={index}>
                    <div className={`w-6 h-6 rounded-full ${activeColor(index)}`}></div>
                    {isFinalStep(index) ? null : <div className={`w-12 h-1 ${activeColor(index)}`}></div>}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Stepper