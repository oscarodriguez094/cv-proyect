import { UserRole } from '@/Back/models';

interface SeedDeveloper {
	name: string;
	surname: string;
	email: string;
	role: UserRole;
	password: string;
	phone: number;
	description: string;
	address: string;
}

export const seedDeveloper: SeedDeveloper = {
	name: 'Óscar',
	surname: 'Rodríguez López',
	email: 'oscar.rodriguez094@gmail.com',
	role: 'admin',
	password: '123456789',
	phone: 123456789,
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae pretium metus. Aliquam erat volutpat. Nulla eleifend ultrices magna quis pellentesque. Mauris sodales nisl sed blandit vehicula. Etiam auctor metus ut dui dignissim volutpat. Nunc tellus neque, lacinia in justo ac, dignissim semper massa. Integer vestibulum commodo pharetra. Vestibulum ac turpis eu felis varius molestie pharetra quis dolor. Nam varius, velit at ultrices viverra, dolor urna ultricies tellus, pretium feugiat mauris purus id urna. Curabitur commodo erat in dolor interdum eleifend. Cras eleifend hendrerit arcu, ac sagittis orci sodales nec. Nullam sollicitudin ligula vel risus viverra eleifend. Nullam eu odio vestibulum sapien rutrum scelerisque nec at arcu. Sed metus lorem, aliquam quis est eget, faucibus venenatis dui. Mauris dignissim accumsan nisl, ut mattis ante lacinia in.Aliquam at consequat justo, at bibendum nibh. Nullam fringilla bibendum tortor, convallis egestas dui bibendum quis. Fusce sagittis aliquet elit, nec lobortis ante lobortis nec. Donec quis lobortis nibh. Suspendisse sodales ipsum tellus, posuere placerat massa lacinia nec. Mauris sollicitudin odio ac tortor aliquam, et pharetra libero pulvinar. Pellentesque aliquet erat ut nisi malesuada, et dapibus sem pretium. Nam sagittis mauris quis felis fermentum, non elementum nisl facilisis.',
	address: 'Travesía San Lorenzo, 10'
};
