import React from 'react';
import './Footer.css';

function Footer() {
	return (
		<div className='footer'>
			<div>
				Background photo by{' '}
				<a href='https://unsplash.com/@laup?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
					Paul Volkmer
				</a>{' '}
				on{' '}
				<a href='https://unsplash.com/wallpapers/nature/night-sky?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
					Unsplash
				</a>
			</div>
			<p>Single web app created by Juliet Gavison for Zoomin</p>
		</div>
	);
}

export default Footer;
