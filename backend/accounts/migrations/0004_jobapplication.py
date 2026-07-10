

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_savedjob'),
    ]

    operations = [
        migrations.CreateModel(
            name='JobApplication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.IntegerField()),
                ('status', models.CharField(choices=[('Applied', 'Applied'), ('Under Review', 'Under Review'), ('Interview', 'Interview'), ('Offered', 'Offered'), ('Rejected', 'Rejected')], default='Under Review', max_length=50)),
                ('applied_date', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='applications', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-applied_date'],
                'unique_together': {('user', 'job_id')},
            },
        ),
    ]
