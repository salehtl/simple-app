# Email Verification Setup Guide

This guide explains how to configure email verification with Better Auth in your application.

## 📧 Email Configuration

### 1. Environment Variables

Add these environment variables to your `.env` file or Docker Compose configuration:

```bash
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-specific-password
EMAIL_FROM=your-email@gmail.com
```

### 2. Email Provider Options

#### Option A: Gmail (Development)
```bash
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-specific-password
EMAIL_FROM=your-email@gmail.com
```

**Setup Steps:**
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" in your Google Account settings
3. Use the app password (not your regular password) in `EMAIL_APP_PASSWORD`

#### Option B: SendGrid (Production)
```bash
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
```

#### Option C: AWS SES (Production)
```bash
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
EMAIL_FROM=noreply@yourdomain.com
```

#### Option D: Custom SMTP
```bash
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
EMAIL_FROM=your-email@yourdomain.com
```

## 🔧 Better Auth Configuration

The application is already configured with:

- ✅ **Email Verification**: Enabled (`requireEmailVerification: true`)
- ✅ **Auto Send on Signup**: Verification emails sent automatically
- ✅ **Auto Sign-in**: Users signed in after verification
- ✅ **Password Reset**: Email-based password reset functionality
- ✅ **HTML Templates**: Professional email templates

## 🚀 Features Included

### Email Verification
- Users must verify their email before logging in
- Automatic verification email sent on registration
- Professional HTML email templates
- 24-hour expiration for verification links

### Password Reset
- Email-based password reset functionality
- Secure token generation and validation
- 1-hour expiration for reset links
- Professional HTML email templates

### Email Templates
- Responsive HTML design
- Fallback text versions
- Branded styling
- Clear call-to-action buttons

## 🧪 Testing

### Development Testing
1. Use Gmail with app-specific password
2. Check your email for verification links
3. Test the verification flow

### Production Testing
1. Use a professional email service (SendGrid, AWS SES)
2. Test with real email addresses
3. Monitor email delivery rates

## 📝 Usage Examples

### Manual Email Verification
```javascript
// Send verification email manually
await authClient.sendVerificationEmail({
  email: "user@example.com",
  callbackURL: "/dashboard"
})
```

### Password Reset
```javascript
// Send password reset email
await authClient.forgetPassword({
  email: "user@example.com",
  callbackURL: "/reset-password"
})
```

## 🔒 Security Features

- **Token Expiration**: Verification links expire after 24 hours
- **Secure Tokens**: Cryptographically secure random tokens
- **Rate Limiting**: Built-in protection against spam
- **Email Validation**: Proper email format validation

## 🎨 Customization

You can customize email templates in `/src/lib/email.ts`:

- Modify HTML templates
- Add your branding
- Change email content
- Add custom styling

## 🚨 Troubleshooting

### Common Issues

1. **Gmail "Less Secure Apps"**: Use App Passwords instead
2. **SMTP Authentication**: Check credentials and ports
3. **Email Not Delivered**: Check spam folder, verify sender reputation
4. **Token Expired**: Tokens expire after 24 hours

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG=better-auth:*
```

## 📚 Additional Resources

- [Better Auth Email Documentation](https://better-auth.com/docs/concepts/email)
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833)

