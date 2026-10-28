import { reviews } from '@/constants/home/reviews';
import { useMarket } from '@/hooks/use-market';

export function ReviewsSection() {
    const { country } = useMarket();
    const countryReviews = reviews[country.code] ?? [];

    return (
        <section
            className="sf-reviews sf-section"
            id="sf-reviews"
            aria-labelledby="sf-reviews-title"
        >
            <h2 id="sf-reviews-title">
                Made for the moments <em>that matter most</em>
            </h2>
            <p className="sf-review-note">
                Illustrative stories. Reviews from verified bookings will appear
                here once families have used Six Feet.
            </p>
            <div className="sf-review-grid">
                {countryReviews.map((review) => (
                    <blockquote key={review.name}>
                        <p>“{review.quote}”</p>
                        <footer>
                            <span
                                className="sf-review-initials"
                                aria-hidden="true"
                            >
                                {review.initials}
                            </span>
                            <span>
                                <strong>{review.name}</strong>
                                <span>{review.place}</span>
                            </span>
                        </footer>
                    </blockquote>
                ))}
            </div>
        </section>
    );
}
