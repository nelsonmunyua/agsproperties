import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Video, Image, X } from 'lucide-react';
import { Card } from '../../features/dashboard/components';
import { useProperties } from './components/useProperties';
import AgentLayout from './AgentLayout';

const Input = ({ label, name, value, onChange, type = 'text', placeholder, required, options, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
        required={required}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        required={required}
      />
    )}
  </div>
);

const ImageUpload = ({ images, onAdd, onRemove }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onAdd(files);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Images</label>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-3">
            <Image className="w-8 h-8 text-emerald-500" />
          </div>
          <span className="text-slate-600 font-medium">Click to upload images</span>
          <span className="text-sm text-slate-400 mt-1">PNG, JPG up to 10MB</span>
        </label>
      </div>
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div key={index} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100">
              <img
                src={img.preview || img.url}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const VideoUpload = ({ videos, onAdd, onRemove, existingVideos = [] }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onAdd(files);
    }
  };

  const handleRemoveExisting = (videoId) => {
    onRemove(null, videoId);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">Property Videos</label>
      <div className="border-2 border-dashed border-slate-200 rounded-xl p-6">
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-3">
            <Video className="w-8 h-8 text-slate-500" />
          </div>
          <span className="text-slate-600 font-medium">Click to upload videos</span>
          <span className="text-sm text-slate-400 mt-1">MP4, WebM up to 50MB</span>
        </label>
      </div>
      {existingVideos.length > 0 && (
        <div className="mt-4 text-sm text-slate-500">
          {existingVideos.length} existing video(s)
        </div>
      )}
      {videos.length > 0 && (
        <div className="mt-4 text-sm text-emerald-600">
          {videos.length} new video(s) selected
        </div>
      )}
    </div>
  );
};

const PropertyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProperty, createProperty, updateProperty, loading: propertyLoading } = useProperties();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'Ksh',
    listing_type: 'onsale',
    status: 'onsale',
    property_type_id: '1',
    bedrooms: '',
    bathrooms: '',
    area_size: '',
    area_unit: 'sqft',
    city: '',
    neighborhood: '',
  });

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchProperty = async () => {
        try {
          const data = await getProperty(parseInt(id));
          setFormData({
            title: data.property?.title || '',
            description: data.property?.description || '',
            price: data.property?.price || '',
            currency: data.property?.currency || 'Ksh',
            listing_type: data.property?.listing_type || 'onsale',
            status: data.property?.status || 'onsale',
            property_type_id: data.property?.property_type_id?.toString() || '1',
            bedrooms: data.property?.bedrooms || '',
            bathrooms: data.property?.bathrooms || '',
            area_size: data.property?.area_size || '',
            area_unit: data.property?.area_unit || 'sqft',
            city: data.location?.city || '',
            neighborhood: data.location?.neighborhood || '',
          });
          setExistingImages(data.images?.map((img) => img.id) || []);
        } catch (err) {
          console.error('Failed to fetch property:', err);
        }
      };
      fetchProperty();
    }
  }, [id, isEditing, getProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageAdd = (files) => {
    const newImagesWithPreview = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...newImagesWithPreview]);
  };

  const handleImageRemove = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (imageId) => {
    setExistingImages((prev) => prev.filter((id) => id !== imageId));
  };

  const handleVideoAdd = (files) => {
    setNewVideos((prev) => [...prev, ...files]);
  };

  const handleVideoRemove = (index, videoId = null) => {
    if (videoId !== null) {
      setExistingVideos((prev) => prev.filter((id) => id !== videoId));
    } else {
      setNewVideos((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.price || !formData.listing_type || !formData.property_type_id) {
      setError('Please fill in all required fields');
      return;
    }

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Add new images
    newImages.forEach((img) => data.append('images', img.file));

    // Add existing images to keep
    if (existingImages.length > 0) {
      data.append('existing_images', JSON.stringify(existingImages));
    }

    // Add new videos
    newVideos.forEach((vid) => data.append('videos', vid));

    // Add existing videos to keep
    if (existingVideos.length > 0) {
      data.append('existing_videos', JSON.stringify(existingVideos));
    }

    setSaving(true);
    try {
      if (isEditing) {
        await updateProperty(parseInt(id), data);
      } else {
        await createProperty(data);
      }
      navigate('/agent/properties');
    } catch (err) {
      console.error('Failed to save property:', err);
      setError(err.message || 'Failed to save property');
    } finally {
      setSaving(false);
    }
  };

  const currencyOptions = [
    { value: 'Ksh', label: 'Ksh (Kenyan Shilling)' },
    { value: '$', label: 'USD' },
    { value: '€', label: 'EUR' },
    { value: '£', label: 'GBP' },
  ];

  const listingTypeOptions = [
    { value: 'onsale', label: 'For Sale' },
    { value: 'onrent', label: 'For Rent' },
    { value: 'lease', label: 'For Lease' },
  ];

  const propertyTypeOptions = [
    { value: '1', label: 'House' },
    { value: '2', label: 'Apartment' },
    { value: '3', label: 'Villa' },
    { value: '4', label: 'Townhouse' },
    { value: '5', label: 'Land' },
    { value: '6', label: 'Commercial' },
  ];

  const statusOptions = [
    { value: 'onsale', label: 'On Sale' },
    { value: 'onrent', label: 'On Rent' },
    { value: 'leased', label: 'Leased' },
    { value: 'sold', label: 'Sold' },
  ];

  const areaUnitOptions = [
    { value: 'sqft', label: 'sq ft' },
    { value: 'sqm', label: 'sq m' },
    { value: 'acres', label: 'acres' },
    { value: 'hectares', label: 'hectares' },
  ];

  const handleBack = () => {
    navigate('/agent/properties');
  };

  return (
    <AgentLayout activeTab="properties">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Properties</span>
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          {isEditing ? 'Edit Property' : 'Create New Property'}
        </h1>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Basic Information</h2>
            
            <Input
              label="Property Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Beautiful 4 Bedroom House in Karen"
              required
            />

            <div className="mt-4">
              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                type="textarea"
                placeholder="Describe your property..."
              />
            </div>
          </Card>

          {/* Price & Type */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Price & Type</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 15000000"
                required
              />

              <Input
                label="Currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                type="select"
                options={currencyOptions}
              />

              <Input
                label="Listing Type"
                name="listing_type"
                value={formData.listing_type}
                onChange={handleChange}
                type="select"
                options={listingTypeOptions}
                required
              />

              <Input
                label="Property Type"
                name="property_type_id"
                value={formData.property_type_id}
                onChange={handleChange}
                type="select"
                options={propertyTypeOptions}
                required
              />

              <Input
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                type="select"
                options={statusOptions}
              />
            </div>
          </Card>

          {/* Property Details */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="e.g., 4"
              />

              <Input
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="e.g., 3"
              />

              <Input
                label="Area Size"
                name="area_size"
                type="number"
                value={formData.area_size}
                onChange={handleChange}
                placeholder="e.g., 2500"
              />

              <Input
                label="Area Unit"
                name="area_unit"
                value={formData.area_unit}
                onChange={handleChange}
                type="select"
                options={areaUnitOptions}
              />
            </div>
          </Card>

          {/* Location */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g., Nairobi"
              />

              <Input
                label="Neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                placeholder="e.g., Karen"
              />
            </div>
          </Card>

          {/* Images */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Images</h2>
            
            <ImageUpload
              images={[...newImages, ...(existingImages.length > 0 ? [{ id: 'existing', url: '/api/placeholder' }] : [])]}
              onAdd={handleImageAdd}
              onRemove={(index) => {
                if (index >= newImages.length) {
                  handleRemoveExistingImage(existingImages[index - newImages.length]);
                } else {
                  handleImageRemove(index);
                }
              }}
            />
          </Card>

          {/* Videos */}
          <Card className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Videos</h2>
            
            <VideoUpload
              videos={newVideos}
              existingVideos={existingVideos}
              onAdd={handleVideoAdd}
              onRemove={handleVideoRemove}
            />
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-4 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || propertyLoading}
              className="flex-1 px-6 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving...' : propertyLoading ? 'Loading...' : isEditing ? 'Update Property' : 'Create Property'}
            </button>
          </div>
        </form>
      </div>
    </AgentLayout>
  );
};

export default PropertyFormPage;

