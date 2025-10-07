# AWS Contact Form Setup Instructions

## Prerequisites
- AWS Account (create at aws.amazon.com if you don't have one)
- GitHub account with your portfolio repository
- Access to your email (thabo.mafa2@gmail.com)

---

## PART 1: AWS SES EMAIL SETUP

### Step 1: Login to AWS Console
1. Go to https://aws.amazon.com
2. Click "Sign In to the Console"
3. Enter your AWS account credentials
4. You'll be taken to the AWS Management Console

### Step 2: Navigate to SES (Simple Email Service)
1. In the AWS Console search bar, type "SES"
2. Click on "Simple Email Service" from the dropdown
3. **Important**: Make sure you're in the **US East (N. Virginia)** region (top right corner)
   - If not, click the region dropdown and select "US East (N. Virginia) us-east-1"

### Step 3: Verify Your Email Address
1. In the SES Console, look for "Verified identities" in the left sidebar
2. Click "Verified identities"
3. Click the orange "Create identity" button
4. Select "Email address" (not domain)
5. Enter your email: `thabo.mafa2@gmail.com`
6. Click "Create identity"
7. **IMMEDIATELY** check your Gmail inbox for a verification email from AWS
8. Click the verification link in the email
9. Return to AWS Console - you should see "Verified" status

---

## PART 2: IAM ROLE SETUP

### Step 4: Create IAM Role for Lambda
1. In AWS Console search bar, type "IAM"
2. Click "IAM" from dropdown
3. In left sidebar, click "Roles"
4. Click "Create role" button
5. Under "Trusted entity type", select "AWS service"
6. Under "Use case", select "Lambda"
7. Click "Next"
8. In the search box, type "AWSLambdaBasicExecutionRole"
9. Check the box next to "AWSLambdaBasicExecutionRole"
10. In the search box, type "AmazonSESFullAccess"
11. Check the box next to "AmazonSESFullAccess"
12. Click "Next"
13. Role name: `portfolio-contact-form-role`
14. Click "Create role"
15. **Write down this role name** - you'll need it later

---

## PART 3: LAMBDA FUNCTION SETUP

### Step 5: Create Lambda Function
1. In AWS Console search bar, type "Lambda"
2. Click "Lambda" from dropdown
3. Click "Create function" button
4. Select "Author from scratch"
5. Function name: `portfolio-contact-form`
6. Runtime: Select "Python 3.9" from dropdown
7. Under "Permissions", click "Change default execution role"
8. Select "Use an existing role"
9. From dropdown, select `portfolio-contact-form-role`
10. Click "Create function"

### Step 6: Add Lambda Code
1. You should now see the Lambda function editor
2. Delete all existing code in the editor
3. Copy ALL the code from your `lambda-contact-form.py` file
4. Paste it into the Lambda editor
5. **IMPORTANT**: Update the email template in the code:
   - Replace both instances of `thabo.mafa2@gmail.com` with your actual email
   - Update the thank you email message to:
   ```
   Hi {name},

   Thank you for submitting your inquiry via my portfolio website!

   I have successfully received your message and appreciate you taking the time to connect. I typically respond to all messages within 24–48 hours during business days.

   I look forward to reviewing your request and will be in touch shortly.

   Best regards,

   Thabo Mafa
   Junior Cloud Field Engineer
   [Your Portfolio Website URL]
   ```
6. Click "Deploy" button (orange button at top)
7. Wait for "Changes deployed" message

---

## PART 4: API GATEWAY SETUP

### Step 7: Create API Gateway
1. In AWS Console search bar, type "API Gateway"
2. Click "API Gateway" from dropdown
3. Click "Create API" button
4. Under "REST API" (not REST API Private), click "Build"
5. Select "New API"
6. API name: `portfolio-contact-api`
7. Description: `Contact form API for portfolio website`
8. Click "Create API"

### Step 8: Create API Resource
1. You should see your API with just a "/" resource
2. Click "Actions" dropdown
3. Select "Create Resource"
4. Resource Name: `contact`
5. Resource Path: `/contact` (should auto-fill)
6. **Check the box** for "Enable API Gateway CORS"
7. Click "Create Resource"

### Step 9: Create POST Method
1. Click on the `/contact` resource you just created
2. Click "Actions" dropdown
3. Select "Create Method"
4. From the small dropdown that appears, select "POST"
5. Click the checkmark ✓
6. Integration type: "Lambda Function"
7. **Check the box** for "Use Lambda Proxy integration"
8. Lambda Region: `us-east-1`
9. Lambda Function: Start typing `portfolio-contact-form` and select it
10. Click "Save"
11. Click "OK" when prompted about permissions

### Step 10: Enable CORS
1. Click on the `/contact` resource
2. Click "Actions" dropdown
3. Select "Enable CORS"
4. Leave all default settings
5. Click "Enable CORS and replace existing CORS headers"
6. Click "Yes, replace existing values"

### Step 11: Deploy API
1. Click "Actions" dropdown
2. Select "Deploy API"
3. Deployment stage: Select "[New Stage]"
4. Stage name: `prod`
5. Click "Deploy"
6. **COPY THE INVOKE URL** - it looks like:
   `https://abc123def.execute-api.us-east-1.amazonaws.com/prod`
7. **Save this URL** - you'll need it for your website

---

## PART 5: UPDATE YOUR GITHUB WEBSITE

### Step 12: Update Your Website Code
1. Open your `script.js` file
2. Find the line with `YOUR_API_GATEWAY_URL_HERE`
3. Replace it with your API Gateway URL + `/contact`
   
   **Example:**
   ```javascript
   // Replace this:
   const response = await fetch('YOUR_API_GATEWAY_URL_HERE', {
   
   // With this (using your actual URL):
   const response = await fetch('https://abc123def.execute-api.us-east-1.amazonaws.com/prod/contact', {
   ```

### Step 13: Push Changes to GitHub
1. Save your `script.js` file
2. Commit and push changes to your GitHub repository:
   ```bash
   git add script.js
   git commit -m "Add contact form API integration"
   git push origin main
   ```
3. Wait 1-2 minutes for GitHub Pages to update

---

## PART 6: TESTING

### Step 14: Test Your Contact Form
1. Go to your live website (GitHub Pages URL)
2. Scroll to the contact form
3. Fill out ALL fields:
   - Name: Your name
   - Email: A test email (can be your own)
   - Subject: "Test message"
   - Message: "This is a test"
4. Click "Send Message"
5. You should see "Thank you for reaching out!" message

### Step 15: Verify Emails
1. Check your Gmail inbox - you should receive the contact form message
2. Check the test email inbox - should receive thank you message
3. If emails don't arrive within 2 minutes, check AWS SES console for errors

---

## TROUBLESHOOTING

### If form submission fails:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Submit form and check for error messages
4. Common issues:
   - Wrong API Gateway URL
   - CORS not enabled properly
   - Lambda function errors

### If emails don't send:
1. Go to AWS SES Console
2. Check if your email is still verified
3. Check AWS Lambda logs:
   - Go to Lambda Console
   - Click your function
   - Click "Monitor" tab
   - Click "View logs in CloudWatch"

### SES Sandbox Mode:
- Initially, SES is in "sandbox mode"
- You can only send emails to verified addresses
- To send to any email, request production access:
  1. Go to SES Console
  2. Click "Account dashboard"
  3. Click "Request production access"
  4. Fill out the form explaining your use case

---

## COST BREAKDOWN
- **Lambda**: Free tier includes 1M requests/month
- **API Gateway**: Free tier includes 1M requests/month
- **SES**: $0.10 per 1,000 emails
- **Estimated monthly cost for 100 form submissions**: $0.01

---

## SECURITY BEST PRACTICES
1. Monitor your AWS billing dashboard regularly
2. Set up billing alerts for unusual usage
3. Consider adding rate limiting to prevent spam
4. Never share your AWS credentials
5. Regularly review IAM permissions

**🎉 Congratulations! Your contact form is now powered by AWS and showcases your cloud engineering skills!**