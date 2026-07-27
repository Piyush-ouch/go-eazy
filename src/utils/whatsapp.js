/**
 * WhatsApp Helper Utilities & Deep Link Generator
 * GoEazy WhatsApp Assist™ Integration
 */

export const OFFICIAL_WHATSAPP_BOT_NUMBER = '919876543210'

/**
 * Format any Indian phone number for WhatsApp wa.me links
 */
export const cleanPhoneNumber = (phone) => {
  if (!phone) return OFFICIAL_WHATSAPP_BOT_NUMBER
  const cleaned = phone.replace(/[^\d]/g, '')
  if (cleaned.length === 10) return `91${cleaned}`
  return cleaned
}

/**
 * Generate a standard wa.me link with encoded message
 */
export const generateWhatsAppLink = (phone, message) => {
  const num = cleanPhoneNumber(phone)
  const encodedMsg = encodeURIComponent(message)
  return `https://wa.me/${num}?text=${encodedMsg}`
}

/**
 * Chat directly with Landlord on WhatsApp regarding a property
 */
export const getLandlordChatLink = (phone, propertyTitle, price, city, area) => {
  const msg = `Hi! I found your property listing on GoEazy: "${propertyTitle}" (${area}, ${city} - ₹${price?.toLocaleString('en-IN')}/mo). Is it available for a site visit?`
  return generateWhatsAppLink(phone || OFFICIAL_WHATSAPP_BOT_NUMBER, msg)
}

/**
 * Schedule Site Visit via WhatsApp
 */
export const getVisitBookingLink = (phone, propertyTitle, date, time) => {
  const msg = `Hi GoEazy Assist! I would like to confirm a site visit for "${propertyTitle}" on ${date} at ${time}. Please send me the location pin.`
  return generateWhatsAppLink(phone || OFFICIAL_WHATSAPP_BOT_NUMBER, msg)
}

/**
 * Receive Lease Document PDF via WhatsApp
 */
export const getLeaseDocLink = (phone, propertyTitle, leaseId) => {
  const msg = `Hi GoEazy! Please send me the official rental lease agreement PDF for "${propertyTitle}" (Lease Ref: #${leaseId || 'GE-8842'}).`
  return generateWhatsAppLink(phone || OFFICIAL_WHATSAPP_BOT_NUMBER, msg)
}

/**
 * Rent Payment Reminder & Link via WhatsApp
 */
export const getPaymentReminderLink = (phone, propertyTitle, amount, dueDate) => {
  const msg = `Hi! Here is your GoEazy rent payment alert for "${propertyTitle}". Rent Amount: ₹${amount?.toLocaleString('en-IN')} Due Date: ${dueDate}. Click to pay via Razorpay.`
  return generateWhatsAppLink(phone || OFFICIAL_WHATSAPP_BOT_NUMBER, msg)
}

/**
 * Search Properties via WhatsApp Assistant
 */
export const getSearchQueryLink = (queryText) => {
  const msg = `Hey GoEazy Bot! ${queryText}`
  return generateWhatsAppLink(OFFICIAL_WHATSAPP_BOT_NUMBER, msg)
}

/**
 * Send Flatmate Rent & Utility Split Request via WhatsApp
 */
export const getFlatmateSplitReminderLink = (phone, flatmateName, propertyTitle, amount, roomType, upiId) => {
  const upiLink = `upi://pay?pa=${upiId || 'landlord@upi'}&pn=GoEazyRent&am=${amount}&cu=INR`
  const msg = `Hi ${flatmateName}! 👋 Here is your monthly rent & utility share for "${propertyTitle || 'Flat'}" (${roomType || 'Room'}):\n\n💰 *Total Share: ₹${amount?.toLocaleString('en-IN')}*\n\nPay via GPay / PhonePe / Paytm UPI:\n${upiLink}\n\nSent via GoEazy Split&Pay™`
  return generateWhatsAppLink(phone, msg)
}
