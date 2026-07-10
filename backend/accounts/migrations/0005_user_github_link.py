

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_jobapplication'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='github_link',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
