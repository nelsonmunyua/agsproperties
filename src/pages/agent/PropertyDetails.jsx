import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Eye, Edit, Trash2, DollarSign } from 'lucide-react';
import { PageHeader, Card } from '../../features/dashboard/components';
import { useProperties } from './components/useProperties';
import AgentLayout from './AgentLayout';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProperty, deleteProperty, loading, error } = useProperties();
  const [property, setProperty] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProperty = React.useCallback(async () => {
    try {
      const data = await getProperty(parseInt(id));
      setProperty(data);
    } catch (err) {
      console.error('Failed to fetch property:', err);
    } finally {
      setFetching(false);
    }
  }, [id]);

  React.useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${property?.property?.title}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteProperty(parseInt(id));
      navigate('/agent/properties');
    } catch (err) {
      alert('Failed to delete property');
    }
  };

  const handleEdit = () => {
    navigate(`/agent/properties/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/agent/properties');
  };

  if (fetching) {
    return (
      <AgentLayout activeTab="properties">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-500">Loading property details...</p>
          </div>
        </div>
      </AgentLayout>
    );
  }

  if (!property) {
    return (
      <AgentLayout activeTab="properties">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-slate-500 mb-4">Property not found</p>
            <button onClick={handleBack} className="text-emerald-600 hover:text-emerald-700">
              Back to Properties
            </button>
          </div>
        </div>
      </AgentLayout>
    );
  }

  const { property: prop, images, videos, location, views } = property;

  const formatPrice = (price, currency = 'Ksh') => {
    if (!price) return 'Price on request';
    return `${currency} ${new Intl.NumberFormat('en-KE').format(price)}`;
  };

  const allImages = images?.length > 0 ? images : [];
  const primaryImage = allImages[0]?.url;

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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-4">
            {primaryImage ? (
              <img src={primaryImage} alt={prop?.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <MapPin className="w-20 h-20 text-slate-300" />
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-lg overflow-hidden bg-slate-100"
                >
                  <img src={img.url} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <Card className="mt-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Description</h3>
            <p className="text-slate-600 leading-relaxed">
              {prop?.description || 'No description provided.'}
            </p>
          </Card>

          {/* Property Details */}
          <Card className="mt-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Property Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {prop?.bedrooms > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Bed className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                  <div className="text-2xl font-bold text-slate-900">{prop.bedrooms}</div>
                  <div className="text-sm text-slate-500">Bedrooms</div>
                </div>
              )}
              {prop?.bathrooms > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Bath className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                  <div className="text-2xl font-bold text-slate-900">{prop.bathrooms}</div>
                  <div className="text-sm text-slate-500">Bathrooms</div>
                </div>
              )}
              {prop?.area_size > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <Square className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                  <div className="text-2xl font-bold text-slate-900">{prop.area_size}</div>
                  <div className="text-sm text-slate-500">{prop?.area_unit}</div>
                </div>
              )}
              <div className="bg-slate-50 rounded-xl p-4 text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                <div className="text-2xl font-bold text-slate-900">{views || 0}</div>
                <div className="text-sm text-slate-500">Views</div>
              </div>
            </div>
          </Card>

          {/* Location */}
          {location && (location.city || location.neighborhood) && (
            <Card className="mt-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Location</h3>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-6 h-6 text-emerald-500" />
                <span className="text-lg">
                  {[location.city, location.neighborhood].filter(Boolean).join(', ')}
                </span>
              </div>
              {location.latitude && location.longitude && (
                <div className="mt-3 text-sm text-slate-500">
                  Coordinates: {location.latitude}, {location.longitude}
                </div>
              )}
            </Card>
          )}

          {/* Videos */}
          {videos?.length > 0 && (
            <Card className="mt-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Videos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {videos.map((vid) => (
                  <div key={vid.id} className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                    <span className="text-slate-500">Video {vid.id}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Title & Price */}
            <Card>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{prop?.title}</h1>
              <div className="flex items-center gap-2 text-3xl font-bold text-emerald-600 mb-4">
                <DollarSign className="w-8 h-8" />
                {formatPrice(prop?.price, prop?.currency)}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                  prop?.status === 'onsale' ? 'bg-blue-100 text-blue-700' :
                  prop?.status === 'onrent' ? 'bg-green-100 text-green-700' :
                  prop?.status === 'sold' ? 'bg-gray-100 text-gray-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {prop?.status === 'onsale' ? 'For Sale' :
                   prop?.status === 'onrent' ? 'For Rent' :
                   prop?.status === 'sold' ? 'Sold' : 'Leased'}
                </span>
                <span className="text-sm text-slate-500 capitalize">
                  {prop?.listing_type}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleEdit}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <Edit size={20} />
                  Edit Property
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </Card>

            {/* Listing Info */}
            <Card>
              <h3 className="font-semibold text-slate-900 mb-3">Listing Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Listed</span>
                  <span className="text-slate-900">
                    {prop?.listing_date ? new Date(prop.listing_date).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Property Type</span>
                  <span className="text-slate-900 capitalize">{prop?.property_type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Listing Type</span>
                  <span className="text-slate-900 capitalize">{prop?.listing_type}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AgentLayout>
  );
};

export default PropertyDetailsPage;

