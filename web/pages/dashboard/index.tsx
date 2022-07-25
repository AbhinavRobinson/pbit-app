import React from 'react'

// components

import CardPageVisits from 'components/Cards/CardPageVisits'
import CardSocialTraffic from 'components/Cards/CardSocialTraffic'

// layout for page

import DashboardLayout from 'layouts/Dashboard'

export default function Dashboard() {
	return (
		<DashboardLayout>
			<div className='flex flex-wrap mt-4'>
				<div className='w-full xl:w-8/12 mb-12 xl:mb-0 px-4'>
					<CardPageVisits />
				</div>
				<div className='w-full xl:w-4/12 px-4'>
					<CardSocialTraffic />
				</div>
			</div>
		</DashboardLayout>
	)
}
