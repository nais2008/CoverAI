import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import AuthContext from '../../../../context/AuthContext';

interface PersonalData {
  name: string;
  email: string;
}

interface FeedbackData {
  personal_data: PersonalData;
  text: string;
  status: string;
}

const FeedbackForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FeedbackData>();
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("FeedbackForm must be used within an AuthProvider");
  }

  const { authTokens } = context;

  const onSubmit: SubmitHandler<FeedbackData> = async (data) => {
    try {
      setSubmissionStatus('Submitting...');

      // Отправка данных с помощью fetch
      const response = await fetch('http://localhost:8000/api/v1/feedbacks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionStatus('Feedback submitted successfully!');
      } else {
        const errorData = await response.json();
        setSubmissionStatus(`Error: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      setSubmissionStatus('Error submitting feedback.');
      console.error(error);
    }
  };

  return (
    <div className="feedback-form">
      <h1>Submit your feedback</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="wrapper">
          <div className="good_message">
            {submissionStatus && <p className="good_message">{submissionStatus}</p>}
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register('personal_data.name', { required: 'Name is required' })}
            />
            {errors.personal_data?.name && <span>{errors.personal_data.name.message}</span>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('personal_data.email', { required: 'Email is required' })}
            />
            {errors.personal_data?.email && <span>{errors.personal_data.email.message}</span>}
          </div>

          <div>
            <label htmlFor="feedbackText">Feedback</label>
            <textarea
              id="feedbackText"
              {...register('text', { required: 'Feedback text is required' })}
            />
            {errors.text && <span>{errors.text.message}</span>}
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              {...register('status', { required: 'Status is required' })}
            >
              <option value="received">Received</option>
              <option value="in processing">In processing</option>
              <option value="response given">Response given</option>
            </select>
            {errors.status && <span>{errors.status.message}</span>}
          </div>

          <div className="btns">
            <button type="submit" className="btn">Submit Feedback</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
