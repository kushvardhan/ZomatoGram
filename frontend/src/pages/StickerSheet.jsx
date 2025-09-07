import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Star, 
  ShoppingCart, 
  User, 
  Settings,
  Download,
  Upload,
  Plus,
  Minus
} from 'lucide-react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownItem,
  DropdownDivider,
  Select,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ToastProvider,
  useToast,
  Loader,
  LoadingOverlay,
  FullPageLoader,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonRestaurantCard
} from '../components/ui';
import { ZomatoGramLogo1, ZomatoGramLogo2, ZomatoGramLogo3, ZomatoGramLogo4, ZomatoGramLogo5 } from '../assets/logos';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const StickerSheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullPageLoader, setShowFullPageLoader] = useState(false);
  const { toast } = useToast();

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const showToast = (type) => {
    const messages = {
      success: 'Success! Your order has been placed.',
      error: 'Error! Something went wrong.',
      warning: 'Warning! Please check your input.',
      info: 'Info! New restaurants available in your area.',
    };
    
    toast[type](messages[type]);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const showFullLoader = () => {
    setShowFullPageLoader(true);
    setTimeout(() => setShowFullPageLoader(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="heading-1 mb-4">ZomatoGram Design System</h1>
          <p className="body-large text-neutral-600 dark:text-neutral-400">
            A comprehensive showcase of all UI components used in ZomatoGram.
          </p>
        </div>

        <div className="space-y-12">
          {/* Logos Section */}
          <section>
            <h2 className="heading-2 mb-6">Animated Logos</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="text-center">
                <ZomatoGramLogo1 className="w-16 h-16 mx-auto mb-2 text-primary-600" />
                <p className="caption">Logo Variant 1</p>
              </div>
              <div className="text-center">
                <ZomatoGramLogo2 className="w-16 h-16 mx-auto mb-2 text-primary-600" />
                <p className="caption">Logo Variant 2</p>
              </div>
              <div className="text-center">
                <ZomatoGramLogo3 className="w-16 h-16 mx-auto mb-2 text-primary-600" />
                <p className="caption">Logo Variant 3</p>
              </div>
              <div className="text-center">
                <ZomatoGramLogo4 className="w-16 h-16 mx-auto mb-2 text-primary-600" />
                <p className="caption">Logo Variant 4</p>
              </div>
              <div className="text-center">
                <ZomatoGramLogo5 className="w-16 h-16 mx-auto mb-2 text-primary-600" />
                <p className="caption">Logo Variant 5</p>
              </div>
            </div>
          </section>

          {/* Buttons Section */}
          <section>
            <h2 className="heading-2 mb-6">Buttons</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button leftIcon={<Plus className="w-4 h-4" />}>With Left Icon</Button>
                <Button rightIcon={<Download className="w-4 h-4" />}>With Right Icon</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section>
            <h2 className="heading-2 mb-6">Inputs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <Input label="Basic Input" placeholder="Enter text..." />
              <Input 
                label="With Icon" 
                placeholder="Search..." 
                leftIcon={<Search className="w-4 h-4" />} 
              />
              <Input 
                label="Success State" 
                placeholder="Valid input" 
                success 
                helperText="This looks good!" 
              />
              <Input 
                label="Error State" 
                placeholder="Invalid input" 
                error="This field is required" 
              />
              <Input 
                label="Required Field" 
                placeholder="Required..." 
                required 
                helperText="This field is required" 
              />
              <Input 
                label="Disabled" 
                placeholder="Disabled input" 
                disabled 
              />
            </div>
          </section>

          {/* Cards Section */}
          <section>
            <h2 className="heading-2 mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="heading-4">Basic Card</h3>
                </CardHeader>
                <CardContent>
                  <p className="body">This is a basic card with header and content.</p>
                </CardContent>
              </Card>
              
              <Card hover>
                <CardContent>
                  <h3 className="heading-4 mb-2">Hover Card</h3>
                  <p className="body">This card has hover effects.</p>
                </CardContent>
              </Card>
              
              <Card interactive onClick={() => console.log('Card clicked')}>
                <CardContent>
                  <h3 className="heading-4 mb-2">Interactive Card</h3>
                  <p className="body">This card is clickable.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Dropdowns & Selects */}
          <section>
            <h2 className="heading-2 mb-6">Dropdowns & Selects</h2>
            <div className="flex flex-wrap gap-6">
              <Dropdown
                trigger={
                  <Button variant="outline" rightIcon={<Settings className="w-4 h-4" />}>
                    Dropdown Menu
                  </Button>
                }
              >
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownDivider />
                <DropdownItem>Sign out</DropdownItem>
              </Dropdown>
              
              <Select
                options={selectOptions}
                placeholder="Select an option"
                onChange={(value) => console.log('Selected:', value)}
              />
            </div>
          </section>

          {/* Tabs Section */}
          <section>
            <h2 className="heading-2 mb-6">Tabs</h2>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Card>
                  <CardContent>
                    <h3 className="heading-4 mb-2">Tab 1 Content</h3>
                    <p className="body">This is the content for the first tab.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab2">
                <Card>
                  <CardContent>
                    <h3 className="heading-4 mb-2">Tab 2 Content</h3>
                    <p className="body">This is the content for the second tab.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab3">
                <Card>
                  <CardContent>
                    <h3 className="heading-4 mb-2">Tab 3 Content</h3>
                    <p className="body">This is the content for the third tab.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Loaders Section */}
          <section>
            <h2 className="heading-2 mb-6">Loaders</h2>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-8 items-center">
                <div className="text-center">
                  <Loader variant="spinner" size="sm" />
                  <p className="caption mt-2">Spinner Small</p>
                </div>
                <div className="text-center">
                  <Loader variant="spinner" size="md" />
                  <p className="caption mt-2">Spinner Medium</p>
                </div>
                <div className="text-center">
                  <Loader variant="dots" size="md" />
                  <p className="caption mt-2">Dots</p>
                </div>
                <div className="text-center">
                  <Loader variant="pulse" size="md" />
                  <p className="caption mt-2">Pulse</p>
                </div>
                <div className="text-center">
                  <Loader variant="bars" size="md" />
                  <p className="caption mt-2">Bars</p>
                </div>
              </div>
              
              <LoadingOverlay isLoading={isLoading} message="Loading content...">
                <Card>
                  <CardContent>
                    <h3 className="heading-4 mb-2">Loading Overlay Demo</h3>
                    <p className="body mb-4">Click the button below to see the loading overlay.</p>
                    <Button onClick={toggleLoading}>Toggle Loading</Button>
                  </CardContent>
                </Card>
              </LoadingOverlay>
            </div>
          </section>

          {/* Skeletons Section */}
          <section>
            <h2 className="heading-2 mb-6">Skeletons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="heading-4 mb-4">Text Skeleton</h3>
                <SkeletonText lines={3} />
              </div>
              
              <div>
                <h3 className="heading-4 mb-4">Avatar Skeleton</h3>
                <div className="flex items-center space-x-3">
                  <SkeletonAvatar size="lg" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="heading-4 mb-4">Restaurant Card</h3>
                <SkeletonRestaurantCard />
              </div>
            </div>
          </section>

          {/* Interactive Demos */}
          <section>
            <h2 className="heading-2 mb-6">Interactive Demos</h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              <Button onClick={() => showToast('success')}>Success Toast</Button>
              <Button onClick={() => showToast('error')}>Error Toast</Button>
              <Button onClick={() => showToast('warning')}>Warning Toast</Button>
              <Button onClick={() => showToast('info')}>Info Toast</Button>
              <Button onClick={showFullLoader}>Full Page Loader</Button>
            </div>
          </section>
        </div>
      </div>

      <Footer />

      {/* Modal Demo */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Demo Modal"
        size="md"
      >
        <ModalHeader>
          <h3 className="heading-4">Modal Header</h3>
        </ModalHeader>
        <ModalBody>
          <p className="body">
            This is a demo modal showcasing the modal component with header, body, and footer sections.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>

      {/* Full Page Loader */}
      {showFullPageLoader && (
        <FullPageLoader message="Loading ZomatoGram..." />
      )}
    </div>
  );
};

// Wrap with ToastProvider
const StickerSheetWithToast = () => (
  <ToastProvider>
    <StickerSheet />
  </ToastProvider>
);

export default StickerSheetWithToast;
