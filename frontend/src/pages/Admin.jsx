import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Plus, Save, X, CheckCircle, AlertCircle, DollarSign, Calendar, FileText, Upload, Image } from 'lucide-react';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: null,
    companyLogoFileName: '',
    jobTitle: '',
    locationType: 'On-Campus',
    ctcAmount: '',
    ctcPeriod: '/m',
    stipendAmount: '',
    stipendPeriod: '/ month',
    skills: '',
    description: '',
    category: 'Developer',
    type: 'Full Time',
    verified: true,
    daysLeft: '',
    pdfFile: null,
    pdfFileName: ''
  });

  const [internships, setInternships] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(null);

  const categories = [
    'Developer',
    'Sales',
    'Ops',
    'Marketing',
    'Analytics',
    'Product',
    'Design'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check file type
    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, pdfFile: 'Only PDF files are allowed' }));
      return;
    }
    
    // Check file size (50MB = 50 * 1024 * 1024 bytes)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, pdfFile: 'File size must be less than 50MB' }));
      return;
    }
    
    // Clear any previous errors
    setErrors(prev => ({ ...prev, pdfFile: '' }));
    
    // Read file and convert to base64
    const reader = new FileReader();
    reader.onloadstart = () => setUploadProgress(0);
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        setUploadProgress(progress);
      }
    };
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        pdfFile: e.target.result,
        pdfFileName: file.name
      }));
      setUploadProgress(null);
    };
    reader.onerror = () => {
      setErrors(prev => ({ ...prev, pdfFile: 'Error reading file' }));
      setUploadProgress(null);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Check file type - allow common image formats
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, companyLogo: 'Only image files (PNG, JPG, GIF, WebP, SVG) are allowed' }));
      return;
    }
    
    // Check file size (5MB limit for images)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, companyLogo: 'Image size must be less than 5MB' }));
      return;
    }
    
    // Clear any previous errors
    setErrors(prev => ({ ...prev, companyLogo: '' }));
    
    // Read file and convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({
        ...prev,
        companyLogo: e.target.result,
        companyLogoFileName: file.name
      }));
    };
    reader.onerror = () => {
      setErrors(prev => ({ ...prev, companyLogo: 'Error reading image file' }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({
      ...prev,
      pdfFile: null,
      pdfFileName: ''
    }));
    setErrors(prev => ({ ...prev, pdfFile: '' }));
  };

  const handleRemoveLogo = () => {
    setFormData(prev => ({
      ...prev,
      companyLogo: null,
      companyLogoFileName: ''
    }));
    setErrors(prev => ({ ...prev, companyLogo: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.companyLogo.trim()) newErrors.companyLogo = 'Company logo is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.ctcAmount || formData.ctcAmount < 0) newErrors.ctcAmount = 'Valid CTC amount is required';
    if (!formData.stipendAmount || formData.stipendAmount < 0) newErrors.stipendAmount = 'Valid stipend amount is required';
    if (!formData.skills.trim()) newErrors.skills = 'At least one skill is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.daysLeft || formData.daysLeft < 1) newErrors.daysLeft = 'Days left must be at least 1';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newInternship = {
      id: Date.now(),
      companyName: formData.companyName,
      companyLogo: formData.companyLogo,
      jobTitle: formData.jobTitle,
      locationType: formData.locationType,
      ctc: `₹${formData.ctcAmount.toLocaleString()}${formData.ctcPeriod}`,
      ctcRaw: formData.ctcAmount,
      stipend: `₹${formData.stipendAmount.toLocaleString()}`,
      stipendPeriod: formData.stipendPeriod,
      stipendRaw: formData.stipendAmount,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
      description: formData.description,
      category: formData.category,
      type: formData.type,
      verified: formData.verified,
      postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysLeft: parseInt(formData.daysLeft),
      pdfFile: formData.pdfFile,
      pdfFileName: formData.pdfFileName
    };

    setInternships(prev => [newInternship, ...prev]);
    
    setFormData({
      companyName: '',
      companyLogo: null,
      companyLogoFileName: '',
      jobTitle: '',
      locationType: 'On-Campus',
      ctcAmount: '',
      ctcPeriod: '/m',
      stipendAmount: '',
      stipendPeriod: '/ month',
      skills: '',
      description: '',
      category: 'Developer',
      type: 'Full Time',
      verified: true,
      daysLeft: '',
      pdfFile: null,
      pdfFileName: ''
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    setInternships(prev => prev.filter(internship => internship.id !== id));
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#333'
  };

  const errorStyle = {
    color: '#dc2626',
    fontSize: '12px',
    marginTop: '4px'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '2px solid #1FAA59', padding: '15px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#1FAA59', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>K</span>
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1FAA59', margin: 0 }}>KIIT Admin Panel</h1>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>Internship Management System</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Total Internships: <strong style={{ color: '#1FAA59' }}>{internships.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          padding: '15px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <CheckCircle style={{ width: '20px', height: '20px', color: '#155724' }} />
          <span style={{ color: '#155724', fontWeight: '600' }}>Internship added successfully!</span>
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '30px 20px' }}>
        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Form Section */}
          <div style={{ flex: '1', backgroundColor: 'white', borderRadius: '10px', padding: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <Plus style={{ width: '24px', height: '24px', color: '#1FAA59' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>Add New Internship</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                {/* Company Name */}
                <div>
                  <label style={labelStyle}>
                    Company Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g., Infosys"
                    style={{ ...inputStyle, borderColor: errors.companyName ? '#dc2626' : '#ddd' }}
                  />
                  {errors.companyName && <div style={errorStyle}>{errors.companyName}</div>}
                </div>

                {/* Company Logo Upload */}
                <div>
                  <label style={labelStyle}>
                    Company Logo (Image) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  
                  {!formData.companyLogo ? (
                    <div>
                      <label 
                        htmlFor="logo-upload"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '12px',
                          border: '2px dashed #ddd',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          backgroundColor: '#fafafa',
                          transition: 'all 0.2s',
                          borderColor: errors.companyLogo ? '#dc2626' : '#ddd'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = '#1FAA59';
                          e.currentTarget.style.backgroundColor = '#f0f9f4';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = errors.companyLogo ? '#dc2626' : '#ddd';
                          e.currentTarget.style.backgroundColor = '#fafafa';
                        }}
                      >
                        <Image style={{ width: '20px', height: '20px', color: '#1FAA59' }} />
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>
                          Upload Logo
                        </span>
                      </label>
                      <input
                        id="logo-upload"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                        onChange={handleLogoUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px',
                      border: '1px solid #1FAA59',
                      borderRadius: '6px',
                      backgroundColor: '#f0f9f4'
                    }}>
                      <img 
                        src={formData.companyLogo} 
                        alt="Company logo preview"
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          objectFit: 'contain',
                          borderRadius: '4px',
                          backgroundColor: 'white',
                          padding: '4px'
                        }}
                      />
                      <div style={{ flex: 1, fontSize: '12px', color: '#666' }}>
                        {formData.companyLogoFileName}
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#fee',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '11px',
                          color: '#dc2626',
                          fontWeight: '600'
                        }}
                      >
                        <X style={{ width: '12px', height: '12px' }} />
                      </button>
                    </div>
                  )}
                  {errors.companyLogo && <div style={errorStyle}>{errors.companyLogo}</div>}
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                    PNG, JPG, GIF, WebP, or SVG (max 5MB)
                  </div>
                </div>

                {/* Job Title */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>
                    Job Title <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Development Intern"
                    style={{ ...inputStyle, borderColor: errors.jobTitle ? '#dc2626' : '#ddd' }}
                  />
                  {errors.jobTitle && <div style={errorStyle}>{errors.jobTitle}</div>}
                </div>

                {/* Location Type */}
                <div>
                  <label style={labelStyle}>
                    Location Type <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="On-Campus">On-Campus</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                {/* CTC Amount */}
                <div>
                  <label style={labelStyle}>
                    CTC Amount (₹) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="number"
                      name="ctcAmount"
                      value={formData.ctcAmount}
                      onChange={handleInputChange}
                      placeholder="e.g., 18000"
                      min="0"
                      style={{ ...inputStyle, flex: 1, borderColor: errors.ctcAmount ? '#dc2626' : '#ddd' }}
                    />
                    <select
                      name="ctcPeriod"
                      value={formData.ctcPeriod}
                      onChange={handleInputChange}
                      style={{ ...inputStyle, width: '110px', cursor: 'pointer' }}
                    >
                      <option value="/m">/m</option>
                      <option value="/month">/month</option>
                      <option value="/year">/year</option>
                      <option value="/annum">/annum</option>
                    </select>
                  </div>
                  {errors.ctcAmount && <div style={errorStyle}>{errors.ctcAmount}</div>}
                </div>

                {/* Stipend Amount */}
                <div>
                  <label style={labelStyle}>
                    Stipend Amount (₹) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="number"
                      name="stipendAmount"
                      value={formData.stipendAmount}
                      onChange={handleInputChange}
                      placeholder="e.g., 20000"
                      min="0"
                      style={{ ...inputStyle, flex: 1, borderColor: errors.stipendAmount ? '#dc2626' : '#ddd' }}
                    />
                    <select
                      name="stipendPeriod"
                      value={formData.stipendPeriod}
                      onChange={handleInputChange}
                      style={{ ...inputStyle, width: '110px', cursor: 'pointer' }}
                    >
                      <option value="/ month">/ month</option>
                      <option value="/ year">/ year</option>
                      <option value="/ week">/ week</option>
                    </select>
                  </div>
                  {errors.stipendAmount && <div style={errorStyle}>{errors.stipendAmount}</div>}
                </div>

                {/* Type */}
                <div>
                  <label style={labelStyle}>
                    Internship Type <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label style={labelStyle}>
                    Category <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Days Left */}
                <div>
                  <label style={labelStyle}>
                    Days Left to Apply <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="daysLeft"
                    value={formData.daysLeft}
                    onChange={handleInputChange}
                    placeholder="e.g., 15"
                    min="1"
                    style={{ ...inputStyle, borderColor: errors.daysLeft ? '#dc2626' : '#ddd' }}
                  />
                  {errors.daysLeft && <div style={errorStyle}>{errors.daysLeft}</div>}
                </div>

                {/* Skills/Tags */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>
                    Skills/Technologies (comma-separated) <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="e.g., Java, Spring Boot, SQL"
                    style={{ ...inputStyle, borderColor: errors.skills ? '#dc2626' : '#ddd' }}
                  />
                  {errors.skills && <div style={errorStyle}>{errors.skills}</div>}
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                    Separate multiple skills with commas
                  </div>
                </div>

                {/* Description */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>
                    Job Description <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="e.g., Develop enterprise-grade applications and systems."
                    rows="3"
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', borderColor: errors.description ? '#dc2626' : '#ddd' }}
                  />
                  {errors.description && <div style={errorStyle}>{errors.description}</div>}
                </div>

                {/* PDF Upload */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>
                    Upload Job Description PDF (Optional)
                  </label>
                  
                  {!formData.pdfFile ? (
                    <div>
                      <label 
                        htmlFor="pdf-upload"
                        style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          padding: '20px',
                          border: '2px dashed #ddd',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: '#fafafa',
                          transition: 'all 0.2s',
                          borderColor: errors.pdfFile ? '#dc2626' : '#ddd'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = '#1FAA59';
                          e.currentTarget.style.backgroundColor = '#f0f9f4';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = errors.pdfFile ? '#dc2626' : '#ddd';
                          e.currentTarget.style.backgroundColor = '#fafafa';
                        }}
                      >
                        <Upload style={{ width: '24px', height: '24px', color: '#1FAA59' }} />
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                            Click to upload PDF
                          </div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            Maximum file size: 50MB
                          </div>
                        </div>
                      </label>
                      <input
                        id="pdf-upload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                      {uploadProgress !== null && (
                        <div style={{ marginTop: '10px' }}>
                          <div style={{ 
                            width: '100%', 
                            height: '6px', 
                            backgroundColor: '#e0e0e0', 
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{ 
                              width: `${uploadProgress}%`, 
                              height: '100%', 
                              backgroundColor: '#1FAA59',
                              transition: 'width 0.3s ease'
                            }} />
                          </div>
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px', textAlign: 'center' }}>
                            Uploading... {Math.round(uploadProgress)}%
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 15px',
                      border: '1px solid #1FAA59',
                      borderRadius: '8px',
                      backgroundColor: '#f0f9f4'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                        <FileText style={{ width: '20px', height: '20px', color: '#1FAA59' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                            {formData.pdfFileName}
                          </div>
                          <div style={{ fontSize: '11px', color: '#666' }}>
                            {formData.pdfFile ? `${(formData.pdfFile.length / 1024 / 1024 * 0.75).toFixed(2)} MB` : ''}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#fee',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#dc2626',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <X style={{ width: '14px', height: '14px' }} />
                        Remove
                      </button>
                    </div>
                  )}
                  {errors.pdfFile && <div style={errorStyle}>{errors.pdfFile}</div>}
                  <div style={{ fontSize: '11px', color: '#666', marginTop: '6px' }}>
                    Upload a detailed job description PDF (max 50MB). This is optional.
                  </div>
                </div>

                {/* Verified */}
                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    name="verified"
                    id="verified"
                    checked={formData.verified}
                    onChange={handleInputChange}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="verified" style={{ fontWeight: '600', fontSize: '14px', color: '#333', cursor: 'pointer' }}>
                    Mark as Verified Company
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#1FAA59',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s',
                  marginTop: '10px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#178f4a'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#1FAA59'}
              >
                <Save style={{ width: '20px', height: '20px' }} />
                Add Internship
              </button>
            </form>
          </div>

          {/* Preview/List Section */}
          <div style={{ width: '380px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
                Recent Additions ({internships.length})
              </h3>
              
              {internships.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#999' }}>
                  <AlertCircle style={{ width: '48px', height: '48px', margin: '0 auto 15px', opacity: '0.5' }} />
                  <p style={{ fontSize: '14px' }}>No internships added yet</p>
                  <p style={{ fontSize: '12px', marginTop: '5px' }}>Fill out the form to add your first internship</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '600px', overflowY: 'auto', paddingRight: '5px' }}>
                  {internships.map((internship) => (
                    <div
                      key={internship.id}
                      style={{
                        padding: '18px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '12px',
                        backgroundColor: '#fff',
                        position: 'relative',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                      }}
                    >
                      {/* Favorite Icon (Top Right) */}
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        color: '#ccc',
                        fontSize: '18px'
                      }}>
                        ♡
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(internship.id)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '45px',
                          backgroundColor: '#fee',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#fdd'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#fee'}
                        title="Delete"
                      >
                        <X style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                      </button>

                      {/* Company Logo/Name */}
                      <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {internship.companyLogo && (
                          <img 
                            src={internship.companyLogo}
                            alt={internship.companyName}
                            style={{
                              width: '32px',
                              height: '32px',
                              objectFit: 'contain',
                              borderRadius: '4px',
                              backgroundColor: '#f5f5f5',
                              padding: '4px'
                            }}
                          />
                        )}
                        <div style={{ fontSize: '13px', color: '#888', fontWeight: '500' }}>
                          {internship.companyName}
                        </div>
                      </div>

                      {/* Job Title */}
                      <h4 style={{ 
                        fontSize: '17px', 
                        fontWeight: 'bold', 
                        color: '#1a1a1a', 
                        margin: '0 0 12px 0',
                        lineHeight: '1.3',
                        paddingRight: '35px'
                      }}>
                        {internship.jobTitle}
                      </h4>

                      {/* Location and CTC */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '13px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666' }}>
                          <MapPin style={{ width: '14px', height: '14px' }} />
                          <span>{internship.locationType}</span>
                        </div>
                        <div style={{ 
                          padding: '4px 10px',
                          backgroundColor: '#e8f5e9',
                          color: '#1FAA59',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {internship.ctc}
                        </div>
                      </div>

                      {/* Stipend */}
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        color: '#1a1a1a',
                        marginBottom: '12px'
                      }}>
                        {internship.stipend} {internship.stipendPeriod}
                      </div>

                      {/* Skills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
                        {internship.skills.map((skill, idx) => (
                          <span 
                            key={idx}
                            style={{ 
                              padding: '5px 12px', 
                              backgroundColor: '#f5f5f5', 
                              borderRadius: '6px', 
                              fontSize: '12px',
                              color: '#555'
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p style={{ 
                        fontSize: '13px', 
                        color: '#666', 
                        lineHeight: '1.5',
                        margin: '0 0 14px 0'
                      }}>
                        {internship.description}
                      </p>

                      {/* PDF Indicator */}
                      {internship.pdfFile && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          backgroundColor: '#fff3e0',
                          borderRadius: '6px',
                          marginBottom: '14px',
                          fontSize: '12px',
                          color: '#ff6b35'
                        }}>
                          <FileText style={{ width: '14px', height: '14px' }} />
                          <span style={{ fontWeight: '600' }}>PDF attached: {internship.pdfFileName}</span>
                        </div>
                      )}

                      {/* Apply Button */}
                      <button style={{
                        width: '100%',
                        padding: '11px',
                        backgroundColor: '#0d6e3a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}>
                        Apply Now →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;



// import React, { useState } from "react";

// const Admin = () => {
//   const [company, setCompany] = useState({ name: "", description: "", date: "" });
//   const [event, setEvent] = useState({ title: "", description: "", society: "", date: "" });

//   const handleCompanySubmit = (e) => {
//     e.preventDefault();
//     console.log("Company Added:", company);
//     alert("Company added successfully!");
//     setCompany({ name: "", description: "", date: "" });
//   };

//   const handleEventSubmit = (e) => {
//     e.preventDefault();
//     console.log("Event Added:", event);
//     alert("Event added successfully!");
//     setEvent({ title: "", description: "", society: "", date: "" });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

//       <div className="mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Company</h2>
//         <form onSubmit={handleCompanySubmit} className="space-y-2">
//           <input type="text" placeholder="Company Name" value={company.name} onChange={(e)=>setCompany({...company, name:e.target.value})} className="border p-2 rounded w-full"/>
//           <input type="text" placeholder="Description" value={company.description} onChange={(e)=>setCompany({...company, description:e.target.value})} className="border p-2 rounded w-full"/>
//           <input type="date" value={company.date} onChange={(e)=>setCompany({...company, date:e.target.value})} className="border p-2 rounded w-full"/>
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Company</button>
//         </form>
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold mb-2">Add Event</h2>
//         <form onSubmit={handleEventSubmit} className="space-y-2">
//           <input type="text" placeholder="Event Title" value={event.title} onChange={(e)=>setEvent({...event, title:e.target.value})} className="border p-2 rounded w-full"/>
//           <input type="text" placeholder="Description" value={event.description} onChange={(e)=>setEvent({...event, description:e.target.value})} className="border p-2 rounded w-full"/>
//           <input type="text" placeholder="Society Name" value={event.society} onChange={(e)=>setEvent({...event, society:e.target.value})} className="border p-2 rounded w-full"/>
//           <input type="date" value={event.date} onChange={(e)=>setEvent({...event, date:e.target.value})} className="border p-2 rounded w-full"/>
//           <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Event</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Admin;
