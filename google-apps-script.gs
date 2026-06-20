function doPost(e) {
  try {
    const spreadsheetId =
      '1XSA8crAUjNBKOQAtGQ0q60_zB6KdE5SeioDsd6GmD84'

    const sheet = SpreadsheetApp
      .openById(spreadsheetId)
      .getActiveSheet()

    const data = JSON.parse(e.postData.contents)

    const lastRow = sheet.getLastRow()

    // Prevent duplicate child registrations
    // Same email is allowed for multiple children
    // But same child + same DOB + same email is blocked

    if (lastRow > 1) {
      const rows = sheet
        .getRange(2, 1, lastRow - 1, 26)
        .getValues()

      const duplicateExists = rows.some((row) => {
  const existingEmail = String(row[5])
    .toLowerCase()
    .trim()

  const existingPlayer = String(row[7])
    .toLowerCase()
    .trim()

  const existingDob = Utilities.formatDate(
    new Date(row[8]),
    Session.getScriptTimeZone(),
    'yyyy-MM-dd'
  )

  const incomingEmail = String(
    data.emailAddress
  )
    .toLowerCase()
    .trim()

  const incomingPlayer = String(
    data.playerFullName
  )
    .toLowerCase()
    .trim()

  const incomingDob = String(
    data.dateOfBirth
  ).trim()

  return (
    existingEmail === incomingEmail &&
    existingPlayer === incomingPlayer &&
    existingDob === incomingDob
  )
})

      if (duplicateExists) {
        return ContentService
          .createTextOutput(
            JSON.stringify({
              success: false,
              message:
                'This player is already registered.',
            })
          )
          .setMimeType(
            ContentService.MimeType.JSON
          )
      }
    }

    // Append row

    sheet.appendRow([
      data.registrationId,

      data.parentFullName,
      data.relationship,
      data.phoneNumber,
      data.whatsappNumber,
      data.emailAddress,
      data.homeAddress,

      data.playerFullName,
      data.dateOfBirth,
      data.age,

      data.position,
      data.currentClub,
      data.footballExperience,
      data.medicalCondition,

      data.emergencyContactName,
      data.emergencyContactNumber,

      data.programsSelected,

      data.insuranceAvailable,
      data.insuranceType,

      data.tshirtSize,

      data.paymentStatus,
      data.paymentMethod,
      data.paymentPhoneNumber,

      data.specialPriceCompanyReferral,

      data.notes,

      new Date(),
    ])

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message:
            'Registration successful.',
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      )

  } catch (error) {
    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          message: error.toString(),
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      )
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
