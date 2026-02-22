import React, { useState } from 'react';
import { X, Upload, Video, Image } from 'lucide-react';

const Input = ({ label, name, value, onChange, type = 'text', placeholder, required, options, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
        rows={3}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        required={required}
      />
    )}
  </div>
);

const ImageUpload = ({ images, onAdd, onRemove, label = 'Property Images' }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onAdd(files);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="border-2 border-dashed border-slate-200 rounded-lg p-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <Image className="w-8 h-8 text-slate-400 mb-2" />
          <span className="text-sm text-slate-500">Click to upload images</span>
        </label>
      </div>
      {images.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img.preview || img.url}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
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
      <label className="block text-sm font-medium text-slate-700 mb-1">Property Videos</label>
      <div className="border-2 border-dashed border-slate-200 rounded-lg p-4">
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload" className="flex flex-col items-center justify-center cursor-pointer">
          <Video className="w-8 h-8 text-slate-400 mb-2" />
          <span className="text-sm text-slate-500">Click to upload videos</span>
        </label>
      </div>
      {existingVideos.length > 0 && (
        <div className="mt-2 text-sm text-slate-500">
          {existingVideos.length} existing video(s)
          <div className="flex flex-wrap gap-2 mt-1">
            {existingVideos.map((vid) => (
              <div key={vid.id} className="relative group">
                <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-slate-400" />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExisting(vid.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {videos.length > 0 && (
        <div className="mt-2 text-sm text-slate-500">
          {videos.length} new video(s) selected
        </div>
      )}
    </div>
  );
};

const PropertyForm = ({ property, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: property?.property?.title || '',
    description: property?.property?.description || '',
    price: property?.property?.price || '',
    currency: property?.property?.currency || 'Ksh',
    listing_type: property?.property?.listing_type || 'onsale',
    status: property?.property?.status || 'onsale',
    property_type_id: property?.property?.property_type_id || '1',
    bedrooms: property?.property?.bedrooms || '',
    bathrooms: property?.property?.bathrooms || '',
    area_size: property?.property?.area_size || '',
    area_unit: property?.property?.area_unit || 'sqft',
    city: property?.location?.city || '',
    neighborhood: property?.location?.neighborhood || '',
  });

  const [newImages, setNewImages] = useState([]);
  const [newVideos, setNewVideos] = useState([]);
  const [existingImages, setExistingImages] = useState(
    property?.images?.map((img) => img.id) || []
  );
  const [existingVideos, setExistingVideos] = useState(
    property?.videos?.map((vid) => vid.id) || []
  );
  const [error, setError] = useState('');

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

    await onSubmit(data);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Property title"
        required
      />

      <Input
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        type="textarea"
        placeholder="Property description"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
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
      </div>

      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          type="select"
          options={statusOptions}
        />

        <Input
          label="Bedrooms"
          name="bedrooms"
          type="number"
          value={formData.bedrooms}
          onChange={handleChange}
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Bathrooms"
          name="bathrooms"
          type="number"
          value={formData.bathrooms}
          onChange={handleChange}
          placeholder="0"
        />

        <Input
          label="Area Size"
          name="area_size"
          type="number"
          value={formData.area_size}
          onChange={handleChange}
          placeholder="0"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Area Unit"
          name="area_unit"
          value={formData.area_unit}
          onChange={handleChange}
          type="select"
          options={areaUnitOptions}
        />

        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Nairobi"
        />
      </div>

      <Input
        label="Neighborhood"
        name="neighborhood"
        value={formData.neighborhood}
        onChange={handleChange}
        placeholder="Karen"
      />

      <ImageUpload
        images={[...newImages, ...(property?.images || [])]}
        onAdd={handleImageAdd}
        onRemove={handleImageRemove}
      />

      <VideoUpload
        videos={newVideos}
        existingVideos={property?.videos || []}
        onAdd={handleVideoAdd}
        onRemove={handleVideoRemove}
      />

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Saving...' : property ? 'Update Property' : 'Create Property'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;

