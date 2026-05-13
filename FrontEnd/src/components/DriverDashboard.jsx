import React, { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from './ui/button';
import { Bar,BarChart,XAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltipContent,ChartTooltip,ChartLegend, ChartLegendContent  } from "../components/ui/chart"



function DriverDashboard({
  className,
  DriverName,
  UpcomingRideRequests,
  setupcomingRideRequests,
  PastRides,
  setPastRides,
  
  MonthlyEarnings={
    chartData:[
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "April", desktop: 73, mobile: 190 },

    ],
    chartConfig:{
      desktop: {
        label: "Desktop",
        color: "#AFDDE5",
      },
      mobile: {
        label: "Mobile",
        color: "black",
      },
    } ,

  },
  DailyEarnings={
    chartData:[
      { month: "January", desktop: 186, mobile: 80 },
      { month: "February", desktop: 305, mobile: 200 },
      { month: "March", desktop: 237, mobile: 120 },
      { month: "April", desktop: 73, mobile: 190 },
      { month: "May", desktop: 209, mobile: 130 },
      { month: "June", desktop: 214, mobile: 140 },
      { month: "June", desktop: 214, mobile: 140 },
  
    ],
    chartConfig:{
      desktop: {
        label: "Desktop",
        color: "#0FA4AF",
      },
      mobile: {
        label: "Mobile",
        color: "#AFDDE5",
      },
    } ,

  },
  Transactions,
}) {

  const [CurrentRide,setCurrentRide]=useState({
    passengerName: "Amit",
    pickupLocation: "Sector 21",
    destination: "Airport",
    pickupTime: "2024-08-07T14:00:00",
    vehicleType: "SUV",
    fareEstimate: 800,
    status: "In Progress",
    additionalNotes: "Passenger will have heavy luggage.",
  })
 


  return (
    <>
      <div className={` bg-[#003135]  ${className} p-4 w-[90vw] mx-auto border-black border-4`}>
      <h1 className='font-sans font-extrabold md:text-4xl text-3xl text-white text-center p-8 '>DASHBOARD</h1>
      <hr/>
      
        <h2 className='text-xl font-bold p-5 text-white'>{DriverName}</h2>

        <div className='flex  w-[100%]  flex-col md:flex-row gap-5 md:flex-wrap items-center justify-evenly'>

          <div className='h-auto bg-[#0FA4AF] md:w-auto w-80 rounded-md border p-4 md:text-2xl text-lg'>
            <h1 className=' border bg-[#AFDDE5] rounded-md text-center mb-2'>CurrentRide</h1>

            <p><label className='font-bold'>Name : </label> {CurrentRide.passengerName}</p>
            <p><label className='font-bold'>PICKUPLOCATION : </label>{CurrentRide.pickupLocation}</p>
            <p><label className='font-bold'>DESTINATION : </label> {CurrentRide.destination}</p>
            <p><label className='font-bold'>VEHICLE TYPE : </label> {CurrentRide.vehicleType}</p>
            <p><label className='font-bold'>FARE ESTIMATE : </label> {CurrentRide.fareEstimate}</p>
            <p><label className='font-bold'>STATUS : </label> {CurrentRide.status}</p>

            <button 
                  onClick={()=>{
                    if(CurrentRide.passengerName==""){
                      return
                    }
                    let id=(PastRides[0].id)+1;
                   
                    
                    let NewData={
                      
                        id:id,
                        name:CurrentRide.passengerName,
                        location:CurrentRide.pickupLocation,
                        destination:CurrentRide.destination,
                        pickupTime:CurrentRide.pickupTime,
                        status: "Cancelled",
                        vehicleType:CurrentRide.vehicleType,
                        fareEstimate:CurrentRide.fareEstimate,
                      
                    }
                 
                   setPastRides([NewData,...PastRides]);
                   setCurrentRide({
                    
                    passengerName: "",
                    pickupLocation: "",
                    destination: "",
                    pickupTime: "",
                    vehicleType: "",
                    fareEstimate:0,
                    status: "",
                    additionalNotes: "",
                  
                 })
                  }}
                  
                  className='bg-black m-3 text-sm font-semibold text-white p-3 rounded-xl '>Cancel Ride</button> 
                  <button 
                  onClick={()=>{
                    let id=(PastRides[0].id)+1;
                   
                    
                    let NewData={
                      
                        id:id,
                        name:CurrentRide.passengerName,
                        location:CurrentRide.pickupLocation,
                        destination:CurrentRide.destination,
                        pickupTime:CurrentRide.pickupTime,
                        status: "Completed",
                        vehicleType:CurrentRide.vehicleType,
                        fareEstimate:CurrentRide.fareEstimate,
                      
                    }
                   setPastRides([NewData,...PastRides]);
                   setCurrentRide({
                    
                      passengerName: "",
                      pickupLocation: "",
                      destination: "",
                      pickupTime: "",
                      vehicleType: "",
                      fareEstimate:0,
                      status: "",
                      additionalNotes: "",
                    
                   })

                  }}
                  
                  className='bg-black m-3 text-white text-sm font-semibold p-3 rounded-xl '>Ride Completed</button>
          </div>

          <div className="mb-11">
            <div className='w-52 p-4 pl-8 rounded-md border-4  font-bold bg-black text-white'>

              <label >UpcomingRides</label>
            </div>
            <ScrollArea className="h-96  md:w-80 w-80 bg-[#965734] rounded-md border p-4">

              {UpcomingRideRequests.map(customersData => (
                <div key={customersData.id} className='mb-4 border-4 bg-white border-black p-4'>
                  <p className='font-semibold'>{customersData.name}</p>
                  <p>PickupLocation: {customersData.location}</p>
                  <p>Destination: {customersData.destination}</p>
                  <p>Pickup Time: {new Date(customersData.pickupTime).toLocaleString()}</p>
                  <p>Vehicle Type: {customersData.vehicleType}</p>
                  <p>Fare Estimate: ₹{customersData.fareEstimate}</p>
                  <button 
                  onClick={()=>{
                      CurrentRide.passengerName=customersData.name;
                      CurrentRide.pickupLocation=customersData.location;
                      CurrentRide.destination=customersData.destination;
                      CurrentRide.fareEstimate=customersData.fareEstimate;
                      CurrentRide.pickupTime=new Date(customersData.pickupTime).toLocaleString();
                      CurrentRide.status="Running";
                      CurrentRide.vehicleType=customersData.vehicleType;
                      setupcomingRideRequests(UpcomingRideRequests.filter((item)=>item.id!=customersData.id));
                       
                  }}
                  
                  className='bg-black text-white p-3 rounded-xl mt-6'>Start</button>

                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="mb-11">
               <div >

           <h1 className='w-52 p-4 pl-8 rounded-md border-4  font-bold bg-black text-white'>PastRides</h1>
               </div>
           <div>
            <ScrollArea className="h-96 md:w-80 w-80 rounded-md border bg-[#965734]  p-4">
            {PastRides.map(customersData => (
                <div key={customersData.id} className='mb-4 bg-white border-4 border-black p-5'>
                  <p className='font-semibold text-blue-500'>{customersData.name}</p>
                  <p>Location: {customersData.location}</p>
                  <p>Destination: {customersData.destination}</p>
                  <p>Pickup Time: {new Date(customersData.pickupTime).toLocaleString()}</p>
                  <p className={customersData.status=="Cancelled"?"text-red-600":"text-green-500"}>Status: {customersData.status}</p>
                  <p>Vehicle Type: {customersData.vehicleType}</p>
                  <p>Fare Estimate: ₹{customersData.fareEstimate}</p>
                </div>
              ))}
            </ScrollArea>
           </div>

          </div>
         <div className='text-black size '>
          <h1 className='text-white'>MONTHLY EARNINGS</h1>
      <ChartContainer config={MonthlyEarnings.chartConfig} className="min-h-[200px] w-full">
      <BarChart c  accessibilityLayer data={MonthlyEarnings.chartData}>
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
      <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} className="bg-white" />
        <ChartLegend className='text-[#965734] text-lg' content={<ChartLegendContent />} />
        <Bar  dataKey="desktop" fill="var(--color-desktop)" radius={3} />
      
      </BarChart>
    </ChartContainer>
    <h1 className='text-white'>DAILY EARNINGS</h1>
      <ChartContainer config={DailyEarnings.chartConfig} className="min-h-[200px] w-full">
      <BarChart   accessibilityLayer data={DailyEarnings.chartData}>
      <XAxis
      dataKey="month"
      tickLine={false}
      tickMargin={10}
      axisLine={false}
      tickFormatter={(value) => value.slice(0, 3)}
    />
      <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} className="bg-white" />
        <ChartLegend className='text-[#965734] text-lg' content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
       
      </BarChart>
    </ChartContainer>
         </div>
        </div>
      </div>
    </>
  );
}

export default DriverDashboard;
