# Generated by Django 4.1.3 on 2023-07-14 19:24

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0006_alter_profile_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(default='', max_length=100)),
                ('password', models.CharField(default='', max_length=18)),
                ('email', models.CharField(default='', max_length=50)),
                ('is_admin', models.BooleanField(blank=True, default=False)),
                ('following', models.ManyToManyField(blank=True, related_name='followers', to='users.user')),
                ('friends', models.ManyToManyField(blank=True, to='users.user')),
            ],
        ),
        migrations.RemoveField(
            model_name='topicsofinterest',
            name='name',
        ),
        migrations.AddField(
            model_name='topicsofinterest',
            name='topics',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(default='', max_length=100), size=None), default=list, size=None),
        ),
        migrations.AlterField(
            model_name='topicsofinterest',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
