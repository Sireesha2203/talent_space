import React,{useContext} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginContext } from '../../contexts/loginContext';

const FormComponent = () => {
    let [currentUser,loginUser,userLoginStatus,loginErr,logoutUser]=useContext(loginContext);
    let navigate=useNavigate();
    const { register, handleSubmit, control, reset, getValues } = useForm();
    const { fields: projectFields, append: appendProject, remove: removeProject } = useFieldArray({
        control,
        name: 'projects',
    });
  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications',
  });
  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({
    control,
    name: 'awards',
  });
  const { fields: publicationFields, append: appendPublication, remove: removePublication } = useFieldArray({
    control,
    name: 'publications',
  });

  const onSubmit = async (data) => {
    try {
      data.username=currentUser.username;
      let token=localStorage.getItem("token")
      let skills=data.skills
      let langs=data.languages
      data.posts=[]
      data.skills=(skills.split('\n')).map(line => line.split(',')).flat();
      data.languages=(langs.split('\n')).map(line=> line.split(',')).flat();
      const response = await axios.put('/user-api/update-other', data,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); // Assuming the response includes the saved data
    //   reset(); // Reset form after successful submission
        navigate('/dashboard')
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="full_name">
          <Form.Label>Full Name:</Form.Label>
          <Form.Control type="text" {...register('full_name')} />
        </Form.Group>

        <Form.Group as={Col} controlId="job_title">
          <Form.Label>Job Title:</Form.Label>
          <Form.Control type="text" {...register('job_title')} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="industry">
          <Form.Label>Industry:</Form.Label>
          <Form.Control type="text" {...register('industry')} />
        </Form.Group>

        <Form.Group as={Col} controlId="location">
          <Form.Label>Location:</Form.Label>
          <Form.Control type="text" {...register('location')} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="skills">
          <Form.Label>Skills:</Form.Label>
          <Form.Control type="text" {...register('skills')} />
        </Form.Group>

        <Form.Group as={Col} controlId="languages">
          <Form.Label>Languages:</Form.Label>
          <Form.Control type="text" {...register('languages')} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="education_level">
          <Form.Label>Education Level:</Form.Label>
          <Form.Control type="text" {...register('education_level')} />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="start_date">
          <Form.Label>Start Date:</Form.Label>
          <Form.Control type="date" {...register('start_date')} />
        </Form.Group>

        <Form.Group as={Col} controlId="end_date">
          <Form.Label>End Date:</Form.Label>
          <Form.Control type="date" {...register('end_date')} />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="summary">
        <Form.Label>Summary:</Form.Label>
        <Form.Control as="textarea" {...register('summary')} />
      </Form.Group>

      {/* Projects */}
      <div className="mb-3">
        <Form.Label>Projects:</Form.Label>
        {projectFields.map((project, index) => (
          <div key={project.id} className="mb-3">
            <Form.Group controlId={`projects.${index}.name`}>
              <Form.Control type="text" {...register(`projects.${index}.name`)} placeholder="Name" />
            </Form.Group>
            <Form.Group controlId={`projects.${index}.description`}>
              <Form.Control as="textarea" {...register(`projects.${index}.description`)} placeholder="Description" />
            </Form.Group>
            <Row>
              <Form.Group as={Col} controlId={`projects.${index}.start_date`}>
                <Form.Label>Start Date:</Form.Label>
                <Form.Control type="date" {...register(`projects.${index}.start_date`)} />
              </Form.Group>
              <Form.Group as={Col} controlId={`projects.${index}.end_date`}>
                <Form.Label>End Date:</Form.Label>
                <Form.Control type="date" {...register(`projects.${index}.end_date`)} />
              </Form.Group>
            </Row>
            <Button variant="danger" onClick={() => removeProject(index)}>Remove</Button>
          </div>
        ))}
        <Button variant="primary" onClick={() => appendProject({})}>Add Project</Button>
      </div>

      {/* Certifications */}
      <div className="mb-3">
        <Form.Label>Certifications:</Form.Label>
        {certificationFields.map((certification, index) => (
          <div key={certification.id} className="mb-3">
            <Form.Group controlId={`certifications.${index}.name`}>
              <Form.Control type="text" {...register(`certifications.${index}.name`)} placeholder="Name" />
            </Form.Group>
            <Form.Group controlId={`certifications.${index}.organization`}>
              <Form.Control type="text" {...register(`certifications.${index}.organization`)} placeholder="Organization" />
            </Form.Group>
            <Form.Group controlId={`certifications.${index}.date`}>
              <Form.Control type="date" {...register(`certifications.${index}.date`)} placeholder="Date" />
            </Form.Group>
            <Button variant="danger" onClick={() => removeCertification(index)}>Remove</Button>
          </div>
        ))}
        <Button variant="primary" onClick={() => appendCertification({})}>Add Certification</Button>
      </div>

      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};

export default FormComponent;


