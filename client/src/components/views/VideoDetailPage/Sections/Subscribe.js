import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";
import { message } from 'antd';

function Subscribe(props) {
    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        axios.post('/api/subscribe/subscribeNumber', { userTo: props.userTo })
            .then(response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    message.error('An internal error occured.');
                }
            });
        
        axios.post('/api/subscribe/subscribed', { userTo: props.userTo, userFrom: props.userFrom })
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed);
                } else {
                    message.error('An internal error occured.');
                }
            });
    }, [props.userTo, props.userFrom]);

    const onSubscribe = () => {
        const subscribedVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom 
        };

        if(Subscribed) {
            axios.post('/api/subscribe/unsubscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber - 1);
                    } else {
                        message.error('An internal error occured.')
                    }
                });
        } else {
            axios.post('/api/subscribe/subscribe', subscribedVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscribeNumber(SubscribeNumber + 1);
                    } else {
                        message.error('An internal error occured.')
                    }
                });
        }

        setSubscribed(!Subscribed);
    };

    return (
        <div>
            <button
                style={{ 
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px',
                    color: 'white',
                    padding: '10px 16px',
                    fontWeight: '500',
                    fontSize: '1rem',
                    textTransform: 'uppercase'
                 }}
                 onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    );
}

export default Subscribe;