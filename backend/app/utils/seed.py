import logging
from ..extensions import db
from ..models.user import User
from ..models.blog import BlogPost

logger = logging.getLogger(__name__)

SAMPLE_POSTS = [
    {
        "title": "The Future of AI-Driven Crop Monitoring",
        "excerpt": "Discover how artificial intelligence is revolutionizing the way farmers monitor crop health, predict yields, and optimize resource usage across thousands of hectares.",
        "content": """
## AI-Driven Crop Monitoring: A New Era

Artificial intelligence is transforming agriculture at an unprecedented pace. At Kbon, we leverage deep learning models trained on millions of satellite and drone images to detect early signs of crop stress, disease, and nutrient deficiency.

### How It Works

Our AI pipeline processes multi-spectral imagery captured by IoT-enabled drones and satellite feeds. The system analyzes:

- **Normalized Difference Vegetation Index (NDVI)** — measures plant health
- **Chlorophyll content estimation** — identifies nutrient stress
- **Thermal imaging** — detects water stress before visible wilting

### Real-World Impact

Farmers using Kbon's platform have reported:
- 30% reduction in pesticide usage
- 25% improvement in yield prediction accuracy
- 40% savings in water consumption

The future of farming is data-driven, and Kbon is leading the charge.
        """,
        "cover_image": "/images/blog/ai-crop-monitoring.jpg",
        "published": True,
    },
    {
        "title": "IoT Sensors in Modern Agriculture: A Complete Guide",
        "excerpt": "Learn how IoT sensor networks are enabling real-time monitoring of soil moisture, temperature, humidity, and more — transforming farms into smart, connected ecosystems.",
        "content": """
## IoT Sensors: The Backbone of Smart Farming

The Internet of Things (IoT) has found one of its most impactful applications in agriculture. By deploying networks of low-power sensors across farmland, growers gain unprecedented visibility into environmental conditions.

### Types of Sensors

1. **Soil Moisture Sensors** — Capacitive and TDR-based sensors measure volumetric water content
2. **Weather Stations** — On-farm microclimate data including temperature, humidity, wind speed
3. **Leaf Wetness Sensors** — Early warning system for fungal disease conditions
4. **NPK Sensors** — Real-time soil nutrient monitoring

### Kbon's IoT Platform

Our edge-computing gateway aggregates data from up to 500 sensors per node, processes readings locally, and transmits summaries via LoRaWAN to the cloud. This architecture ensures:

- Ultra-low latency alerts
- Minimal bandwidth usage
- 3-year battery life on sensor nodes

Smart farming starts with smart sensing.
        """,
        "cover_image": "/images/blog/iot-sensors.jpg",
        "published": True,
    },
    {
        "title": "Sustainable Agriculture Through Precision Technology",
        "excerpt": "Precision agriculture technologies are helping farmers reduce waste, minimize environmental impact, and increase profitability — all while feeding a growing global population.",
        "content": """
## Precision Agriculture for Sustainability

By 2050, the world will need to produce 60% more food. Precision agriculture is the key to meeting this demand without destroying the planet.

### Variable Rate Technology (VRT)

Kbon's VRT integration allows farmers to apply fertilizers, pesticides, and water at variable rates across a field based on real-time sensor data and AI recommendations.

### Carbon Footprint Tracking

Our platform includes built-in carbon accounting tools that help farms:
- Track emissions per acre
- Generate sustainability reports
- Qualify for carbon credit programs

### Results from the Field

A 10,000-acre corn operation in the Midwest reduced nitrogen fertilizer usage by 22% while maintaining yield — a $150,000 annual saving and 800 tons of CO₂ equivalent reduction.

Sustainability isn't just good ethics — it's good business.
        """,
        "cover_image": "/images/blog/sustainable-agriculture.jpg",
        "published": True,
    },
    {
        "title": "From Field to Cloud: Building a Data Pipeline for Agriculture",
        "excerpt": "A technical deep-dive into how Kbon's data pipeline processes millions of data points from farm sensors into actionable intelligence for growers.",
        "content": """
## The Agricultural Data Pipeline

Modern smart farming generates enormous volumes of data. A single 1,000-acre farm with comprehensive sensor coverage produces over 2 million data points per day. Processing this data efficiently requires a robust, scalable pipeline.

### Architecture Overview

Kbon's data pipeline follows a Lambda architecture:

1. **Ingestion Layer** — MQTT brokers receive sensor telemetry at the edge
2. **Stream Processing** — Apache Kafka streams for real-time alerting
3. **Batch Processing** — Spark jobs for historical analysis and model training
4. **Serving Layer** — PostgreSQL + TimescaleDB for fast time-series queries
5. **Presentation** — REST APIs serving the Kbon dashboard

### Data Quality

Raw sensor data is noisy. Our pipeline includes automated quality checks:
- Outlier detection using isolation forests
- Missing value imputation
- Sensor drift calibration

Clean data leads to better decisions.
        """,
        "cover_image": "/images/blog/data-pipeline.jpg",
        "published": True,
    },
    {
        "title": "The ROI of Smart Farming: What the Numbers Say",
        "excerpt": "We break down the return on investment for farms adopting smart agriculture technology, with real case studies and financial analysis.",
        "content": """
## Smart Farming ROI: By the Numbers

Investing in agricultural technology isn't just about innovation — it's about profitability. Here's what our customers are seeing.

### Case Study: Midwest Corn & Soybean

- **Investment**: $45,000 (sensors + platform subscription)
- **Annual Savings**: $180,000 (reduced inputs, optimized irrigation)
- **ROI**: 300% in Year 1
- **Payback Period**: 3 months

### Case Study: California Vineyard

- **Investment**: $28,000
- **Annual Savings**: $95,000 (water savings, reduced crop loss)
- **ROI**: 239% in Year 1
- **Quality Improvement**: 15% increase in premium grape classification

### Industry Averages

According to recent studies, farms adopting precision agriculture see:
- 15-25% reduction in input costs
- 10-20% yield improvement
- 20-30% water savings

The question isn't whether you can afford to invest in smart farming — it's whether you can afford not to.
        """,
        "cover_image": "/images/blog/roi-smart-farming.jpg",
        "published": True,
    },
]


def seed_database():
    """Seed the database with an admin user and sample blog posts."""
    # Create admin user if not exists
    admin = User.query.filter_by(email="admin@kbon.io").first()
    if not admin:
        admin = User(email="admin@kbon.io", role="admin")
        admin.set_password("admin123")
        db.session.add(admin)
        db.session.commit()
        logger.info("Created admin user: admin@kbon.io")

    # Create sample blog posts if none exist
    if BlogPost.query.count() == 0:
        for post_data in SAMPLE_POSTS:
            post = BlogPost(
                title=post_data["title"],
                excerpt=post_data["excerpt"],
                content=post_data["content"].strip(),
                cover_image=post_data["cover_image"],
                published=post_data["published"],
                author_id=admin.id,
            )
            post.generate_slug()
            db.session.add(post)
        db.session.commit()
        logger.info(f"Seeded {len(SAMPLE_POSTS)} blog posts")
