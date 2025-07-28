# Welcome Page Component

A beautiful, animated welcome page for first-time users that matches the theme of your auth page.

## Features

- **Aurora Background**: Animated gradient background matching your auth page theme
- **Responsive Design**: Works on desktop and mobile devices
- **Interactive Elements**: Hover effects and smooth transitions
- **Feature Showcase**: Highlights the key features of your app
- **Step-by-step Guide**: Clear instructions for new users
- **Customizable**: Easy to modify content and styling

## Usage

### Basic Usage

```tsx
import { WelcomePage } from '@/components/pages/WelcomePage';

function MyComponent() {
  const handleGetStarted = () => {
    // Navigate to onboarding or main app
    navigate('/onboarding');
  };

  return (
    <WelcomePage 
      onGetStarted={handleGetStarted}
      userName="John Doe" // Optional: user's name
    />
  );
}
```

### Integration with Auth Flow

Use the `FirstTimeUserWrapper` component to automatically show the welcome page for first-time users:

```tsx
import { FirstTimeUserWrapper } from '@/components/pages/FirstTimeUserWrapper';

function App() {
  return (
    <AuthProvider>
      <FirstTimeUserWrapper>
        {/* Your app routes */}
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </FirstTimeUserWrapper>
    </AuthProvider>
  );
}
```

### Manual Integration

You can also manually control when to show the welcome page:

```tsx
import { useAuth } from '@/components/AuthProvider';
import { WelcomePage } from '@/components/pages/WelcomePage';

function App() {
  const { user, profile } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Check if user is first-time user
    if (user && profile && !profile.has_seen_welcome) {
      setShowWelcome(true);
    }
  }, [user, profile]);

  if (showWelcome) {
    return (
      <WelcomePage 
        onGetStarted={() => {
          setShowWelcome(false);
          // Update user profile to mark welcome as seen
          // Navigate to next step
        }}
        userName={user?.user_metadata?.full_name}
      />
    );
  }

  return <MainApp />;
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onGetStarted` | `() => void` | Yes | Callback function when user clicks "Get Started" |
| `userName` | `string` | No | User's name to display in welcome message |

## Styling

The welcome page uses the same styling system as your auth page:

- **Aurora Background**: Animated gradient background
- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Icons**: Colorful gradient backgrounds for feature icons
- **Responsive Grid**: Adapts to different screen sizes
- **Smooth Animations**: Hover effects and transitions

## Customization

### Modifying Content

Edit the content in `src/components/pages/WelcomePage.tsx`:

- **App Description**: Update the main description text
- **Features**: Modify the feature cards and descriptions
- **Steps**: Change the "How to Get Started" steps
- **Button Text**: Customize the call-to-action button

### Styling Changes

The component uses Tailwind CSS classes and custom CSS. You can modify:

- **Colors**: Update gradient colors in the feature icons
- **Layout**: Adjust spacing and grid layouts
- **Animations**: Modify transition durations and effects
- **Typography**: Change font sizes and weights

## Demo Routes

- `/welcome` - Basic welcome page
- `/welcome-demo` - Interactive demo with navigation

## Database Integration

To properly track if a user has seen the welcome page, add a field to your user profile:

```sql
ALTER TABLE profiles ADD COLUMN has_seen_welcome BOOLEAN DEFAULT FALSE;
```

Then update the user's profile when they complete the welcome page:

```tsx
const { data, error } = await supabase
  .from('profiles')
  .update({ has_seen_welcome: true })
  .eq('user_id', user.id);
```

## Accessibility

The welcome page includes:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Color Contrast**: High contrast text for readability

## Performance

- **Lazy Loading**: Components are loaded only when needed
- **Optimized Animations**: CSS animations for smooth performance
- **Minimal Dependencies**: Uses only essential libraries 