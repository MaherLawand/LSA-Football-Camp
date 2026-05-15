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
    transportationNeeded: '',
    tshirtSize: '',

    paymentStatus: 'Pending',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

if (age < 4 || age > 25) {
  setSubmitMessage(
    'Age must be between 4 and 25.'
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
        transportationNeeded: '',
        tshirtSize: '',

        paymentStatus: 'Pending',
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
          <h1>LSA Football Camp</h1>
          <p>Complete the registration form below</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
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
              <label>Programs Selected</label>
              <input
                type="text"
                name="programsSelected"
                value={formData.programsSelected}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Transportation Needed</label>
              <select
                name="transportationNeeded"
                value={formData.transportationNeeded}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>T-Shirt Size</label>
              <select
                name="tshirtSize"
                value={formData.tshirtSize}
                onChange={handleChange}
              >
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
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

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
          </button>

          {submitMessage && (
            <div
              className={`message ${
                submitMessage.includes('Error') ? 'error' : 'success'
              }`}
            >
              {submitMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default App