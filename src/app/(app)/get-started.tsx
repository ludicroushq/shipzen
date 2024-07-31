'use client';
import {ArrowRightIcon} from 'lucide-react';
import {analytics} from '@/analytics';

export function GetStarted() {
	return (
		<button
			className="btn btn-neutral"
			type="submit"
			onClick={() => {
				analytics.track('getStarted', {path: '/api/auth'});
			}}
		>
			Get Started <ArrowRightIcon className="ml-2 h-4 w-4" />
		</button>
	);
}
