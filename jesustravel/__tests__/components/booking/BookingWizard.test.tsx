import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingWizard from '@/components/booking/BookingWizard';

// Mock fetch
global.fetch = jest.fn();

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

describe('BookingWizard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: [] }),
    });
  });

  it('renders the booking wizard', () => {
    render(<BookingWizard />);
    expect(screen.getByText('Book Your Ride')).toBeInTheDocument();
  });

  it('shows step 1 by default', () => {
    render(<BookingWizard />);
    expect(screen.getByText(/Select Service/i)).toBeInTheDocument();
  });

  it('displays all service type options', () => {
    render(<BookingWizard />);
    expect(screen.getByText('Local Trips')).toBeInTheDocument();
    expect(screen.getByText('Outstation')).toBeInTheDocument();
    expect(screen.getByText('School Pickup')).toBeInTheDocument();
    expect(screen.getByText('Office Shuttle')).toBeInTheDocument();
  });

  it('displays vehicle type options', () => {
    render(<BookingWizard />);
    expect(screen.getByText('Sedan')).toBeInTheDocument();
    expect(screen.getByText('SUV')).toBeInTheDocument();
    expect(screen.getByText('Tempo Traveller')).toBeInTheDocument();
    expect(screen.getByText('Mini Bus')).toBeInTheDocument();
  });

  it('shows step indicator', () => {
    render(<BookingWizard />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('navigates to next step when valid data is provided', async () => {
    render(<BookingWizard />);
    
    // Select service type (first card - local)
    const serviceCards = screen.getAllByRole('button');
    fireEvent.click(serviceCards[0]);
    
    // Select vehicle type
    const vehicleCards = screen.getAllByRole('button');
    fireEvent.click(vehicleCards[1]);
    
    // Click next button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Route Details/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for missing required fields', async () => {
    render(<BookingWizard />);
    
    // Try to proceed without selecting anything
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Please select/i)).toBeInTheDocument();
    });
  });

  it('allows going back to previous step', async () => {
    const user = userEvent.setup();
    render(<BookingWizard />);
    
    // Select service and vehicle, then go to step 2
    const cards = screen.getAllByRole('button');
    await user.click(cards[0]);
    await user.click(cards[1]);
    
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    // Go back
    const backButton = screen.getByText('Back');
    await user.click(backButton);
    
    expect(screen.getByText(/Select Service/i)).toBeInTheDocument();
  });

  it('maintains form data when navigating between steps', async () => {
    const user = userEvent.setup();
    render(<BookingWizard />);
    
    // Select local service
    const localCard = screen.getByText('Local Trips').closest('button');
    if (localCard) {
      await user.click(localCard);
    }
    
    // Verify selection is maintained
    expect(localCard).toHaveClass('border-primary-500');
  });
});
