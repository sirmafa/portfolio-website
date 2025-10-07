import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    # Parse the form data
    try:
        body = json.loads(event['body'])
        name = body['name']
        email = body['email']
        subject = body['subject']
        message = body['message']
    except (KeyError, json.JSONDecodeError) as e:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({'error': 'Invalid form data'})
        }
    
    # Initialize SES client
    ses_client = boto3.client('ses', region_name='us-east-1')  # Change region as needed
    
    try:
        # Send email to you
        ses_client.send_email(
            Source='thabo.mafa2@gmail.com',  # Must be verified in SES
            Destination={'ToAddresses': ['thabo.mafa2@gmail.com']},
            Message={
                'Subject': {'Data': f'Portfolio Contact: {subject}'},
                'Body': {
                    'Text': {
                        'Data': f'Name: {name}\nEmail: {email}\nSubject: {subject}\n\nMessage:\n{message}'
                    }
                }
            }
        )
        
        # Send thank you email to visitor
        ses_client.send_email(
            Source='thabo.mafa2@gmail.com',
            Destination={'ToAddresses': [email]},
            Message={
                'Subject': {'Data': 'Thank you for reaching out!'},
                'Body': {
                    'Text': {
                        'Data': f'Hi {name},\n\nThank you for submitting your inquiry via my portfolio website!\n\nI have successfully received your message and appreciate you taking the time to connect. I typically respond to all messages within 24–48 hours during business days.\n\nI look forward to reviewing your request and will be in touch shortly.\n\nBest regards,\n\nThabo Mafa\nJunior Cloud Field Engineer\n[Your Portfolio Website URL]'
                    }
                }
            }
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({'message': 'Email sent successfully'})
        }
        
    except ClientError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            'body': json.dumps({'error': 'Failed to send email'})
        }