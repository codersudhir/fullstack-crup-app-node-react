// cronJob.js
const cron = require('node-cron');

const generateReport = async () => {
    const totalTasks = await Task.countDocuments({});
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const pendingTasks = await Task.countDocuments({ status: 'pending' });
  
    return `
      <h1>Task Report</h1>
      <p>Total Tasks: ${totalTasks}</p>
      <p>Completed Tasks: ${completedTasks}</p>
      <p>Pending Tasks: ${pendingTasks}</p>
    `;
  };

  const sendDailyreportEmail = async (to, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'teambharatconnect@gmail.com',
        pass: "xsramlnozrwhtrlc"
      }
    });
  
    const mailOptions = {
      from: "teambharatconnect@gmail.com",
      to,
      subject,
      html: htmlContent
    };
  
    await transporter.sendMail(mailOptions);
  };

cron.schedule('0 0 * * *', async () => { // This runs every day at midnight
    try {
        const reportHtml = await generateReport();
        await sendDailyreportEmail("nandanesudhir1@gmail.com","Daily Report Generated", reportHtml);
       return res.status(200).json({ message: 'Report sent successfully' });
      } catch (error) {
       return res.status(500).json({ message: 'Error sending report', error });
      }
   
});
