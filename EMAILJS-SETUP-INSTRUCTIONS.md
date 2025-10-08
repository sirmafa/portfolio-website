# EmailJS Contact Form Setup Instructions

## Prerequisites
- Gmail account (thabo.mafa2@gmail.com)
- GitHub account with your portfolio repository
- No AWS account needed!

---

## PART 1: EMAILJS ACCOUNT SETUP

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" button
3. Choose "Sign up with Google" and use your Gmail account
4. Verify your email if prompted
5. You'll be taken to the EmailJS dashboard

### Step 2: Create Email Service
1. In EmailJS dashboard, click "Email Services" in left sidebar
2. Click "Add New Service" button
3. Select "Gmail" from the list
4. Click "Connect Account"
5. Sign in with your Gmail account (thabo.mafa2@gmail.com)
6. Allow EmailJS permissions
7. Service ID will be auto-generated (write this down)
8. Click "Create Service"

---

## PART 2: EMAIL TEMPLATES SETUP

### Step 3: Create Template for Receiving Messages
1. Click "Email Templates" in left sidebar
2. Click "Create New Template"
3. Template Name: `contact_form_notification`
4. **Subject**: `New Contact Form Message: {{subject}}`
5. **Content (HTML)**:
   ```html
   <h2>New Contact Form Submission</h2>
   <p><strong>Name:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Subject:</strong> {{subject}}</p>
   <p><strong>Message:</strong></p>
   <p>{{message}}</p>
   <hr>
   <p><em>This message was sent from your portfolio website contact form.</em></p>
   ```
6. **To Email**: `thabo.mafa2@gmail.com`
7. **From Name**: `{{from_name}}`
8. **From Email**: `{{from_email}}`
9. **Reply To**: `{{from_email}}`
10. Click "Save"
11. **Write down the Template ID**

### Step 4: Create Auto-Reply Template
1. Click "Create New Template" again
2. Template Name: `contact_form_auto_reply`
3. **Subject**: `Thank you for reaching out!`
4. **Content (HTML)**:
   ```html
   <p>Hi {{from_name}},</p>
   
   <p>Thank you for submitting your inquiry via my portfolio website!</p>
   
   <p>I have successfully received your message and appreciate you taking the time to connect. I typically respond to all messages within 24–48 hours during business days.</p>
   
   <p>I look forward to reviewing your request and will be in touch shortly.</p>
   
   <p>Best regards,</p>
   
   <p>Thabo Mafa<br>
   Junior Cloud Field Engineer<br>
   <a href="https://sirmafa.github.io/portfolio-website/">https://sirmafa.github.io/portfolio-website/</a></p>
   ```
5. **To Email**: `{{from_email}}`
6. **From Name**: `Thabo Mafa`
7. **From Email**: `thabo.mafa2@gmail.com`
8. **Reply To**: `thabo.mafa2@gmail.com`
9. Click "Save"
10. **Write down the Template ID**

---

## PART 3: GET API KEYS

### Step 5: Get Public Key
1. Click "Account" in left sidebar
2. Find "Public Key" section
3. **Copy the Public Key** (starts with something like `user_`)
4. **Write this down** - you'll need it in your code

### Step 6: Get Service and Template IDs
You should now have:
- **Public Key**: `user_xxxxxxxxxx`
- **Service ID**: `service_xxxxxxxxxx`
- **Notification Template ID**: `template_xxxxxxxxxx`
- **Auto-Reply Template ID**: `template_xxxxxxxxxx`

---

## PART 4: UPDATE YOUR WEBSITE

### Step 7: Add EmailJS Script to HTML
1. Open your `index.html` file
2. Add this script tag in the `<head>` section:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```

### Step 8: Update JavaScript
1. Open your `script.js` file
2. Replace the entire contact form handling code with EmailJS code
3. Use your actual Service ID, Template IDs, and Public Key

### Step 9: Test the Setup
1. Save all files
2. Commit and push to GitHub
3. Wait 1-2 minutes for GitHub Pages to update
4. Test your contact form

---

## PART 5: TESTING

### Step 10: Test Your Contact Form
1. Go to your live website
2. Fill out the contact form with:
   - **Name**: Your name
   - **Email**: A test email you can access
   - **Subject**: "Test message"
   - **Message**: "This is a test"
3. Click "Send Message"
4. You should see a success message
5. Check your Gmail - you should receive the notification
6. Check the test email - should receive the auto-reply

---

## TROUBLESHOOTING

### Common Issues:
1. **403 Forbidden**: Check your Public Key is correct
2. **Template not found**: Verify Template IDs match exactly
3. **Service not found**: Verify Service ID is correct
4. **Emails not sending**: Check Gmail spam folder

### EmailJS Limits:
- **Free Plan**: 200 emails/month
- **Paid Plans**: Start at $15/month for 1,000 emails

---

## BENEFITS OF EMAILJS

✅ **No server required** - works with static sites
✅ **Free tier available** - 200 emails/month
✅ **Easy setup** - no complex AWS configuration
✅ **Auto-replies** - visitors get immediate confirmation
✅ **Multiple email services** - Gmail, Outlook, etc.
✅ **Template system** - easy to customize emails
✅ **No CORS issues** - designed for frontend use

**🎉 Your contact form is now powered by EmailJS - simple and reliable!**