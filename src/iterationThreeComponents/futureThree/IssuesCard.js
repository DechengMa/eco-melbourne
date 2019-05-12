import React, { useState } from 'react';
import {
	CardHeader,
	CardImg,
	CardBody,
	Card,
	Button,
	Modal,
	ModalHeader,
	ModalBody
} from 'shards-react';

const IssuesCard = ({ header, body, img, desc, id }) => {
	const [popoverOpen, setOpen] = useState(false);

	return (
		<Card style={{ maxWidth: '350px', height: '660px' }}>
			<CardHeader style={{ fontSize: '1rem', textTransform: 'uppercase' }}>
				{header}
			</CardHeader>
			<CardImg src={img} style={{ maxHeight: '335px' }} />
			<CardBody style={{ fontSize: '1rem' }}>
				{body}
				<Button
					onClick={() => {
						setOpen(!popoverOpen);
					}}
					style={{ position: 'absolute', bottom: '20px', right: '10px' }}
				>
					Learn More
				</Button>
			</CardBody>
			<Modal open={popoverOpen} toggle={setOpen}>
				<ModalHeader>{header}</ModalHeader>
				<ModalBody>
					{desc.split('\n').map((item, i) => (
						<p style={{ marginBottom: '0.25rem' }} key={i}>
							{item}
						</p>
					))}
				</ModalBody>
			</Modal>
		</Card>
	);
};

export default IssuesCard;
