import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    registrationId: crypto.randomUUID(),

    parentFullName: '',
    relationship: '',
    phoneNumber: '',
    whatsappNumber: '',
    emailAddress: '',
homeAddress: '',

    playerFullName: '',
    dateOfBirth: '',
    age: '',

    position: '',
    currentClub: '',
    footballExperience: '',
    medicalCondition: '',

    emergencyContactName: '',
    emergencyContactNumber: '',

    programsSelected: '',
    insuranceAvailable: '',
insuranceType: '',
    tshirtSize: '',

    paymentStatus: 'Pending',
    paymentMethod: '',
paymentPhoneNumber: '',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
const age = Number(formData.age)
const handleChange = (e) => {
  const { name, value } = e.target

  setFormData((prev) => ({
    ...prev,

    [name]: value,

    ...(name === 'insuranceAvailable' &&
    value === 'No'
      ? { insuranceType: '' }
      : {}),
  }))
}

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const scriptURL = import.meta.env.VITE_GOOGLE_SCRIPT_URL

// Validation

if (formData.parentFullName.trim().length < 3) {
  setSubmitMessage('Parent full name is too short.')
  setIsSubmitting(false)
  return
}
if (!formData.dateOfBirth) {
  setSubmitMessage('Please enter a valid date of birth.')
  setIsSubmitting(false)
  return
}

const birthDate = new Date(formData.dateOfBirth)
const today = new Date()

if (birthDate > today) {
  setSubmitMessage(
    'Date of birth cannot be in the future.'
  )
  setIsSubmitting(false)
  return
}

let calculatedAge =
  today.getFullYear() - birthDate.getFullYear()

const monthDifference =
  today.getMonth() - birthDate.getMonth()

if (
  monthDifference < 0 ||
  (monthDifference === 0 &&
    today.getDate() < birthDate.getDate())
) {
  calculatedAge--
}

if (calculatedAge < 2 || calculatedAge > 30) {
  setSubmitMessage(
    'Date of birth does not match allowed age range.'
  )
  setIsSubmitting(false)
  return
}

if (Number(formData.age) !== calculatedAge) {
  setSubmitMessage(
    `Age does not match date of birth. Correct age is ${calculatedAge}.`
  )
  setIsSubmitting(false)
  return
}

if (formData.playerFullName.trim().length < 3) {
  setSubmitMessage('Player full name is too short.')
  setIsSubmitting(false)
  return
}

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(formData.emailAddress)) {
  setSubmitMessage('Please enter a valid email address.')
  setIsSubmitting(false)
  return
}

const phoneRegex = /^[0-9+ ]{7,15}$/

if (!phoneRegex.test(formData.phoneNumber)) {
  setSubmitMessage('Invalid phone number.')
  setIsSubmitting(false)
  return
}

if (
  formData.whatsappNumber &&
  !phoneRegex.test(formData.whatsappNumber)
) {
  setSubmitMessage('Invalid WhatsApp number.')
  setIsSubmitting(false)
  return
}

if (
  !phoneRegex.test(
    formData.emergencyContactNumber
  )
) {
  setSubmitMessage(
    'Invalid emergency contact number.'
  )
  setIsSubmitting(false)
  return
}

const age = Number(formData.age)

if (age < 2 || age > 30) {
  setSubmitMessage(
    'Age must be between 2 and 30.'
  )
  setIsSubmitting(false)
  return
}

if (!formData.position) {
  setSubmitMessage(
    'Please select a position.'
  )
  setIsSubmitting(false)
  return
}

if (!formData.tshirtSize) {
  setSubmitMessage(
    'Please select a t-shirt size.'
  )
  setIsSubmitting(false)
  return
}
if (!formData.paymentMethod) {
  setSubmitMessage(
    'Please select a payment method.'
  )
  setIsSubmitting(false)
  return
}

if (
  !formData.paymentPhoneNumber.trim()
) {
  setSubmitMessage(
    'Please enter the payment phone number.'
  )
  setIsSubmitting(false)
  return
}

if (
  !phoneRegex.test(
    formData.paymentPhoneNumber
  )
) {
  setSubmitMessage(
    'Invalid payment phone number.'
  )
  setIsSubmitting(false)
  return
}
      // await fetch(scriptURL, {
      //   method: 'POST',
      //   mode: 'no-cors',
      //   headers: {
      //     'Content-Type': 'text/plain',
      //   },
      //   body: JSON.stringify(formData),
      // })
      const response = await fetch(scriptURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
  body: JSON.stringify(formData),
})
const result = await response.json()
if (!result.success) {

  setSubmitMessage(result.message)

  setIsSubmitting(false)

  return

}
      setSubmitMessage('Registration submitted successfully!')

     setFormData({
  registrationId: crypto.randomUUID(),

  parentFullName: '',
  relationship: '',
  phoneNumber: '',
  whatsappNumber: '',
  emailAddress: '',
      homeAddress: '',
  playerFullName: '',
  dateOfBirth: '',
  age: '',

  position: '',
  currentClub: '',
  footballExperience: '',
  medicalCondition: '',

  emergencyContactName: '',
  emergencyContactNumber: '',

  programsSelected: '',

  insuranceAvailable: '',
  insuranceType: '',

  tshirtSize: '',

  paymentStatus: 'Pending',

  paymentMethod: '',
  paymentPhoneNumber: '',

  notes: '',
})
    } catch (error) {
      console.error(error)
      setSubmitMessage('Error submitting registration.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app">
    <div className="container">
    <div className="hero">
 <img
    src="/logo.png"
    alt="LSA Logo"
    className="logo"
  />
  <h1>LSA Sports Academy</h1>
  <div className="hero-subtitles">
    <h2>Elite Performance Lab</h2>
    <h3>Summer Edition</h3>
  </div>
  <p>
    Complete the registration form below
  </p>
</div>
      <form
        onSubmit={handleSubmit}
        className="registration-form"
      >
          <div className="section-title">Parent Information</div>

          <div className="grid">
            <div className="form-group">
              <label>Parent Full Name</label>
              <input
                type="text"
                name="parentFullName"
                value={formData.parentFullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Relationship</label>
              <input
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>WhatsApp Number</label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Email Address</label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group full-width">
  <label>Home Address</label>

  <input
    name="homeAddress"
    value={formData.homeAddress}
    onChange={handleChange}
    required
  />
</div>
          </div>

          <div className="section-title">Player Information</div>

          <div className="grid">
            <div className="form-group">
              <label>Player Full Name</label>
              <input
                type="text"
                name="playerFullName"
                value={formData.playerFullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Forward">Forward</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Current Club / Academy</label>
              <input
                type="text"
                name="currentClub"
                value={formData.currentClub}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Football Experience</label>
              <textarea
                rows="4"
                name="footballExperience"
                value={formData.footballExperience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Medical Condition</label>
              <textarea
                rows="3"
                name="medicalCondition"
                value={formData.medicalCondition}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="section-title">Emergency Information</div>

          <div className="grid">
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact Number</label>
              <input
                type="tel"
                name="emergencyContactNumber"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="section-title">Additional Information</div>

          <div className="grid">
            <div className="form-group">

  <label>Program Duration</label>

  <select
    name="programsSelected"
    value={formData.programsSelected}
    onChange={handleChange}
  >
    <option value="">Select Program</option>
    <option value="3 Weeks">
      3 Weeks
    </option>
    <option value="5 Weeks">
      5 Weeks
    </option>
  </select>
</div>

            <div className="form-group">

  <label>Insurance Available</label>

  <select

    name="insuranceAvailable"

    value={formData.insuranceAvailable}

    onChange={handleChange}

  >

    <option value="">Select</option>

    <option value="Yes">Yes</option>

    <option value="No">No</option>

  </select>

</div>

{formData.insuranceAvailable === 'Yes' && (
  <div className="form-group">
    <label>Insurance Type</label>

    <input
      type="text"
      name="insuranceType"
      value={formData.insuranceType}
      onChange={handleChange}
      placeholder="Enter insurance type"
      required
    />
  </div>
)}

            <div className="form-group">
  <label>T-Shirt Size</label>

  <select
    name="tshirtSize"
    value={formData.tshirtSize}
    onChange={handleChange}
  >
    <option value="">Select Size</option>

    <option value="4Y">4Y</option>
    <option value="6Y">6Y</option>
    <option value="8Y">8Y</option>
    <option value="10Y">10Y</option>
    <option value="12Y">12Y</option>
    <option value="14Y">14Y</option>
    <option value="16Y">16Y</option>
    <option value="18Y">18Y</option>
    <option value="20Y">20Y</option>
  </select>
</div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                rows="4"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="section-title">
  Payment Information
</div>

<div className="grid">
  <div className="form-group">
    <label>Payment Method</label>

    <select
      name="paymentMethod"
      value={formData.paymentMethod}
      onChange={handleChange}
      required
    >
      <option value="">
        Select Payment Method
      </option>
<option value="Cash">
Pay by Cash
</option>

      <option value="OMT">
        Pay by OMT
      </option>

      <option value="Neo">
        Pay by Neo
      </option>
    </select>
  </div>

  <div className="form-group">
    <label>
      Payment Phone Number
    </label>

    <input
      type="tel"
      name="paymentPhoneNumber"
      value={formData.paymentPhoneNumber}
      onChange={handleChange}
      placeholder="Enter payment receiver phone number"
      required
    />
  </div>
</div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
          </button>
           </form>
      </div>

          {submitMessage && (
  <div
    className={`floating-message ${
      submitMessage.toLowerCase().includes('success')
  ? 'success'
  : 'error'
    }`}
  >
    {submitMessage}
  </div>
)}
       
    </div>
  )
}

export default App